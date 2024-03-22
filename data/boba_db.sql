CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(256) NOT NULL,
  `name` VARCHAR(256) NOT NULL,
  `password` VARCHAR(512) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`email`)
);

CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  `exp` INT unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`name`)
);

CREATE TABLE IF NOT EXISTS `shopping_lists` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `user` INT unsigned NOT NULL,
  `name` VARCHAR(256),
  `notes` VARCHAR(4096),
  PRIMARY KEY (`id`),

  FOREIGN KEY (`user`)
    REFERENCES users(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `recipes` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `user` INT unsigned NOT NULL,
  `name` VARCHAR(256),
  `desc` VARCHAR(4096),
  `steps` VARCHAR(4096),
  `post_time` DATE NOT NULL,
  PRIMARY KEY (`id`),

  FOREIGN KEY (`user`)
    REFERENCES users(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`name`)
);

CREATE TABLE IF NOT EXISTS `fridges` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `user` INT unsigned NOT NULL,
  `ingr` INT unsigned NOT NULL,
  `qty` INT unsigned NOT NULL,
  `date` DATE NOT NULL,
  `exp_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  
  FOREIGN KEY (`user`)
    REFERENCES users(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE,
  
  FOREIGN KEY (`ingr`)
    REFERENCES ingredients(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `shopping_list_items` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `list` INT unsigned NOT NULL,
  `ingr` INT unsigned NOT NULL,
  `qty` INT unsigned NOT NULL,
  PRIMARY KEY (`id`),

  FOREIGN KEY (`list`)
    REFERENCES shopping_lists(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (`ingr`)
    REFERENCES ingredients(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `recipe_items` (
  `recipe` INT unsigned NOT NULL,
  `ingr` INT unsigned NOT NULL,
  PRIMARY KEY (`recipe`, `ingr`),

  FOREIGN KEY (`recipe`)
    REFERENCES recipes(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (`ingr`)
    REFERENCES ingredients(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `recipe_cats` (
  `recipe` INT unsigned NOT NULL,
  `cat` INT unsigned NOT NULL,
  PRIMARY KEY (`recipe`, `cat`),

  FOREIGN KEY (`recipe`)
    REFERENCES recipes(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (`cat`)
    REFERENCES categories(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `like_recipes` (
  `user` INT unsigned NOT NULL,
  `recipe` INT unsigned NOT NULL,
  PRIMARY KEY (`user`, `recipe`),

  FOREIGN KEY (`user`)
    REFERENCES users(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (`recipe`)
    REFERENCES recipes(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

