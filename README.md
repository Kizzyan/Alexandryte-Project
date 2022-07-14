# Alexandryte
<div align="center">
  <img src="https://github.com/Gryygo/Alexandryte-Project/blob/main/public/img/mockup.png" width="1000px" align="center" />
  <p></p>
  <p>If you want to see the application in action you can check it <a href="https://alexandryte.herokuapp.com/">here!</a></p>
</p>
</div>

---

## About the Project:
  The main idea behind Alexandryte is to manage and list any media you are consuming or intend to consume. I often read some manga that have 
  several hiatuses, so i used to forget some manga that i was reading or wanted to read. This was also true for movies, series, books, etc.
  
  With that in mind, i started looking for sites and apps that could help me with that but none were fit for my tastes or needs. So, i decided to do what programmers do: **Build myself what i needed**.

---

## About Feedback:
Besides being a personal helper, this project is also part of my portfolio, so i will gladly accept any feedback or critic that could help me to improve this application and future ones too.

You can email me at yan.leitao26@gmail.com or contact me at <a href="https://www.linkedin.com/in/yan-gabriel-leit%C3%A3o-de-lima-24b080229/">Linkedin</a>

---

## Installing:
If you want to run this app on your machine juust ```npm install```. Any other useful npm script can be found in the package.json. Any key needed can be found in the .env.sample file

---

## Functionalities:
  - You can signup and login
  - You can create customizable cards for any media you want. A card contains:
    - A name that will be displayed on the homepage.
    - The url for an image that also will be displayed on the homepage.
    - The url for a website where you can watch/read the media. This shortcut button can be found on the detail page of every item that has a link.
    - The item's status that can be Finished or Unfinished.
    - The user's status for the item that can be Seen, Seeing or Want to see.
    - The number of the last released chapter for the item.
    - The number of the last chapter seem by the user for that item.
    - A list of customizable tags. Tags should be separated by comma and space (Ex.: comedy, horror, romance, action).
    - A porcentage of completion that will be displayed on the homepage.
  - You can also update and delete any card anytime you want.
  - You can search for items based on name, user status, item status or tag. You don't need to match the name exactly but the search is case sensitive.
  - When an item is both Finished and Seen the 100% on the homepage is replaced by a star, so the user can have a visual feedback for completed items.
  - Things that will be added on future updates:
    - Password recovery (i had issues with the emailing api so i decided to postpone this feature).
    - Personal reviews for your items (rating + notes).
    - Light and Dark modes and maybe a few more customization settings

---

## This project was build with:
  - Javascript/Node.js: For building all backend logic
  - Express.js: Node framework (for simplifying backend logic's implementation)
  - MongoDB: noSQL database for storing items, users and sessions
  - Mongoose: MongoDB's ODM for making dealing with MongoDB via Node easier
  - SASS: CSS pre-processor for styling
  - EJS: Templating language for Node
  - GIMP: For creating the logo

---

## Personal notes on this project:
 Not only was this my first fully personal backend project, it was also my first project with SASS. It took me around 2 weeks to finish it but in the end i was pretty happy with the result. With this project i was able to solidify my knowledges in building a CRUD application with Node + Express and was also able to pratice new things like using a CSS pre-processor and making multi parameters queries with MongoDB. I barely had any bugs on the process of making this project so the whole experience was pretty enjoyable. I'm really excited for building more project and, even more, building things that can solve even more problems (mine's or other's)
