import csv
import ast
import numpy as np
import random
import string

USER = 200
RECIPE = 500

with open("../recipe_dataset/RAW_recipes.csv", mode='r') as file:
    csv_reader = csv.DictReader(file)
    data_list = []
 
    for row in csv_reader:
        data_list.append(row)

## recipes data
data_list = np.array(data_list)
selected = np.random.choice(data_list, RECIPE, replace=False)
recipe_data = []
user_recipe_map = {}
ingredients = set()
tags = set()
for idx, data in np.ndenumerate(selected):
    d = {}
    d['id'] = idx[0]+1
    d['user'] = random.randint(1, USER)
    if d['user'] in user_recipe_map:
        user_recipe_map[d['user']].append(d['id'])
    else:
        user_recipe_map[d['user']] = [d['id']]

    d['name'] = data['name']
    d['desc'] = data['description']
    steps = ast.literal_eval(data['steps'])
    d['steps'] = '\n'.join(steps)
    d['post_time'] = data['submitted']
    recipe_data.append(d)

    ingrs = ast.literal_eval(data['ingredients'])
    for ingr in ingrs:
        ingredients.add(ingr)
    ts = ast.literal_eval(data['tags'])
    for t in ts:
        tags.add(t)

recipe_fields = ['id', 'user', 'name', 'desc', 'steps', 'post_time']
with open('./recipes.csv', 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=recipe_fields)
    writer.writeheader()
    writer.writerows(recipe_data)

## ingredients data
ingredients = sorted(list(ingredients))
ingr_id_map = {}
ingr_data = []
for idx, ingr in enumerate(ingredients):
    d = {}
    d['id'] = idx+1
    ingr_id_map[ingr] = d['id']
    d['name'] = ingr
    d['exp'] = random.randint(3, 14)
    ingr_data.append(d)

ingr_fields = ['id', 'name', 'exp']
with open('./ingredients.csv', 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=ingr_fields)
    writer.writeheader()
    writer.writerows(ingr_data)

## recipe_item_data
recipe_item_data = []
for idx, data in np.ndenumerate(selected):
    ingrs = ast.literal_eval(data['ingredients'])
    for ingr in ingrs:
        d = {}
        d['recipe'] = idx[0]+1
        d['ingr'] = ingr_id_map[ingr]
        recipe_item_data.append(d)

recipe_item_fields = ['recipe', 'ingr']
with open('./recipe_items.csv', 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=recipe_item_fields)
    writer.writeheader()
    writer.writerows(recipe_item_data)

## tags data
tags = sorted(list(tags))
tag_id_map = {}
tag_data = []
for idx, t in enumerate(tags):
    d = {}
    d['id'] = idx+1
    tag_id_map[t] = d['id']
    d['name'] = t
    tag_data.append(d)

tag_fields = ['id', 'name']
with open('./categories.csv', 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=tag_fields)
    writer.writeheader()
    writer.writerows(tag_data)

## recipe_cat_data
recipe_cat_data = []
for idx, data in np.ndenumerate(selected):
    ts = ast.literal_eval(data['tags'])
    for t in ts:
        d = {}
        d['recipe'] = idx[0]+1
        d['cat'] = tag_id_map[t]
        recipe_cat_data.append(d)

recipe_cat_fields = ['recipe', 'cat']
with open('./recipe_cats.csv', 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=recipe_cat_fields)
    writer.writeheader()
    writer.writerows(recipe_cat_data)

## users data
user_data = []
for i in range(USER):
    d = {}
    d['id'] = i+1
    d['email'] = f'user{i+1}@gmail.com'
    d['name'] = f'user{i+1}'
    d['password'] = f'user{i+1}'
    user_data.append(d)

user_fields = ['id', 'email', 'name', 'password']
with open('./users.csv', 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=user_fields)
    writer.writeheader()
    writer.writerows(user_data)

## like_recipes data:
like_recipes_data = []
num_recipe = len(recipe_data)
for i in range(USER):
    num = random.randint(1, 20)
    liked = set()
    for j in range(num):
        id = random.randint(1, num_recipe)
        if i+1 in user_recipe_map and id not in user_recipe_map[i+1]:
            liked.add(id)
    for id in liked:
        d = {}
        d['user'] = i+1
        d['recipe'] = id
        like_recipes_data.append(d)

like_fields = ['user', 'recipe']
with open('./like_recipes.csv', 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=like_fields)
    writer.writeheader()
    writer.writerows(like_recipes_data)
