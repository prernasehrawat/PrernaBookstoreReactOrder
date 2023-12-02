package api;

import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.io.StringWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Jersey: Manage all validation exceptions that emerge from an API.
 */
@Provider
@Priority(Priorities.USER)
public class ApiExceptionHandler implements
	ExceptionMapper<ApiException> {

	private Logger logger = Logger.getLogger(ApiExceptionHandler.class.getName());

	@Override
	public Response toResponse(ApiException exception) {
		Response.Status status = Response.Status.INTERNAL_SERVER_ERROR;
		if (exception instanceof ApiException.ValidationFailure) {
			status = Response.Status.BAD_REQUEST;
		}
		return makeResponse(exception, status);
	}

	private Response makeResponse(Exception exception, Response.Status status) {
		try {
			StringWriter writer = new StringWriter();
			writer.append(status.getReasonPhrase()).append(" ").append(String.valueOf(status.getStatusCode())).append("\n\n").append(exception.getMessage());
			return Response.status(status).entity(writer.getBuffer().toString()).type(MediaType.TEXT_PLAIN).build();

//			Map<String, Object> jsonResponse = new HashMap<>();
//			jsonResponse.put("reason", status.getReasonPhrase());
//			jsonResponse.put("message", exception.getMessage());
//
//			if (exception instanceof ApiException.ValidationFailure) {
//				ApiException.ValidationFailure validationFailure = (ApiException.ValidationFailure) exception;
//				if (validationFailure.isFieldError()) {
//					jsonResponse.put("fieldName", validationFailure.getFieldName());
//				}
//			} else {
//				jsonResponse.put("fieldName", ""); // If it's not a ValidationFailure, set it to an empty string or whatever you prefer.
//			}
//
//			jsonResponse.put("error", true);
//
//			return Response.status(status)
//					.entity(jsonResponse)
//					.type(MediaType.APPLICATION_JSON)
//					.build();
		} catch (Exception e) {
			logger.log(Level.INFO, e, ()->"Problem attempting to map an Exception to a json response");
			logger.log(Level.INFO, exception, ()->"Original Exception");
			return Response.serverError().build();
		}
	}
}
