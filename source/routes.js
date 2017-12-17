import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import homePageConfigs from './headConfigs/homepage';
import aboutPageConfigs from './headConfigs/about';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} headConfig={homePageConfigs}/>
    <Route path="courses" component={CoursesPage} headConfig={homePageConfigs}/>
    <Route path="about" component={AboutPage} headConfig={aboutPageConfigs}/>
  </Route>
);