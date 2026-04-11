'use strict'

/* global variables */
const createPostForm = document.querySelector('.create-post-form');
const notification = document.querySelector('#notification div');


/* display create post form script */
const createPostBtn = document.querySelector('.create-btn');

createPostBtn.addEventListener('click', function(){
    createPostForm.classList.remove('visible');
});