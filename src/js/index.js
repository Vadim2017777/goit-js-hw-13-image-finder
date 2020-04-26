import '../styles/styles.css';
import _ from 'lodash';
import galleryTemplate from '../templates/gallery-templates.hbs';
import apiService from './services/apiService.js';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error, defaults, Stack } from '@pnotify/core/dist/PNotify';
import '@pnotify/core/dist/PNotify.css';
import 'material-design-icons/iconfont/material-icons.css';

const refs = {
  re: document.querySelector('body'),
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  loadMoreBtn: document.querySelector(`button[data-action="load-more"]`),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function searchFormSubmitHandler(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.query.value;
  apiService.resetPage();
  apiService.searchQuery = searchQuery;

  e.currentTarget.query.value = '';
  clearMarkup();

  apiService.fetchImages().then(buildListItemsMarkup);
}

function loadMoreBtnHandler() {
  apiService.fetchImages().then(buildListItemsMarkup);
}

function buildListItemsMarkup(items) {
  const position = document.body.offsetHeight;
  console.log(position);

  const markup = galleryTemplate(items);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  Scroll(position);
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function Scroll(position) {
  window.scrollTo({
    top: position,
    behavior: 'smooth',
  });
}
