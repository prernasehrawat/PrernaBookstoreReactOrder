DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('Children Book'),('Fiction'),('Literature'),('Math'), ('Religion'), ('Sports');

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Spirit Glass', 'Roashani Chokshi', 'Corazon yearns to finally start training as a babaylan (a mystical healer and spirit guide) under her powerful guardian, Aunt Tina.', 10.99, 4.6, TRUE, TRUE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Misty and Luna', 'A. M. Page', 'Misty, is an energetic and loveable dog, who is a big fan of surprises.', 5.7, 4.3, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('DogTown', 'Katherine Applegate', 'Dogtown is a shelter for stray dogs, misbehaving dogs, and discarded robot dogs, whose owners have outgrown them.',11, 4.4, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Wrecker', 'Carl Hiaasen', 'Wrecker needs to deal with smugglers, grave robbers, and pooping iguanas—just as soon as he finishes Zoom school. Welcome to another wild adventure in Carl Hiaasen''s Florida!', 8.2, 4.14, FALSE, TRUE, 1001);



INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Pax', 'Freida Mc Fadden', 'From bestselling and award-winning author Sara Pennypacker comes a beautifully wrought, utterly compelling.', 6.2, 4.7, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Titan', 'Alex Michaelides', 'Alex Michaelides, history’s first billionaire and the patriarch of America’s most famous dynasty,is an icon whose true nature has eluded three generations of historians.', 7.89, 0, TRUE, TRUE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Too Late', 'Colleen Hoover', 'Sloan will go through hell and back for those she loves. And she does so, every single day.', 7.99, 4.2, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Never Lie', 'Frida Mc Fadden', 'Newlyweds Tricia and Ethan are searching for the house of their dreams.', 10.11, 4.7, FALSE, TRUE, 1002);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Landscape', 'Chirstine Lai', 'In this elegiac and spellbinding blend of narrative, essay and diary, Penelope''s past, present and future collide as fear.', 2.99, 3.9, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('People Collide', 'Isle McElroy', 'Will their new marriage wither completely in each other''s bodies?', 7.99, 4.1, FALSE, TRUE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Hangman', 'Maya Binyam', 'In the morning, I received a phone call and was told to board a flight.', 5.99, 4.2, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Tomb Sweeping', 'Alexandra Chang', 'A woman known only to her neighbors as “the Asian recycling lady” collects bottles from the streets she calls home', 6.99, 3.8, FALSE, TRUE, 1003);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Numbers Dont Lie', 'Vaclav Smil', 'Is flying dangerous? How much do the world''s cows weigh? And what makes people happy?',6.2, 3.4, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Puzzler', 'A. J. Jacobs', 'What makes puzzles--jigsaws, mazes, riddles, sudokus--so satisfying?', 2.99, 4.5, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Inside Game', 'Keith Law', 'In this groundbreaking book, Keith Law, the ESPN baseball writer and author of the acclaimed Smart Baseball', 12.99, 4.6, FALSE, TRUE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Circle', 'Mac Barnett', 'Mac Barnett and Jon Klassen deliver the final tale about Triangle, Square, and Circle.',15, 4.5, TRUE, TRUE, 1004);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Old Gods Time', 'Sebastian Barry', 'Occasionally, fond memories return, of his family, his beloved wife June and their two children, Winnie and Joe.',6.99, 3.94, TRUE, TRUE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Hunted', 'Jeff Wheeler', 'Eilean is rising. A foundling raised in an abbey, she was entrusted by its imprisoned druid, Mordaunt, with an ancient tome.', 8.13, 4.48, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Holy Bible', 'E. Henry', 'An Award or Presentation Bible in the King James Version: ideal as a gift or to keep', 12.99, 3.43, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The History of God', 'Karen Armstrong', 'Exploration of how the three dominant monotheistic religions of the world—Judaism, Christianity, and Islam—have shaped and altered the conception of God is a tour de force.',11.1, 5.28, FALSE, TRUE, 1005);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Rez Ball', 'Byron Graves', 'the first step toward his dream of playing in the NBA, no matter how much the odds are stacked against him',10.99, 4.27, FALSE, TRUE, 1006);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Long Game', 'Elena Armes', 'Adalyn Reyes has spent years perfecting her daily routine: wake up at dawn, drive to the Miami Flames FC offices, try her hardest to leave a mark, go home, and repeat.', 13.99, 3.75, FALSE, FALSE, 1006);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Match Point', 'Maddie Gallegos', 'Her hatred for the sport comes from the pressure she feels from her racquetball-obsessed dad, Miles.', 4.72, 3.84, TRUE, FALSE, 1006);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Poke the Bear', 'Sam Hall', 'I’ve always been invisible. People just look at me and then away. Or worse, their eyes glaze over.Everyone but him.',12, 4.45, TRUE, FALSE, 1006);