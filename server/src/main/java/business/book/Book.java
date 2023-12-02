package business.book;

public record Book(
		long bookId,
		String title,
		String author,
		int price,
		boolean isPublic,
		long categoryId,
		int rating,
		String description,
		boolean isFeatured
) {}
