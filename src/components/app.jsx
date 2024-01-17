import React from 'react';
import { Route} from 'react-router-dom'
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from 'zmp-ui'; 
import { RecoilRoot } from 'recoil';
import HomePage from '../pages';
import About from '../pages/about';
import Form from '../pages/form';
import User from '../pages/user';
import LearnRecoil from '../pages/LearnRecoil';
import TodoListDemo from '../pages/TodoListDemo';



const MyApp = () => {
  return (
    <RecoilRoot>
      <App >
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="/form" element={<Form></Form>}></Route>
            <Route path="/user" element={<User></User>}></Route>
            <Route path="/learnrecoil" element={<LearnRecoil/>}></Route>
            <Route path="/todolistdemo" element={<TodoListDemo></TodoListDemo>}></Route>
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
}
export default MyApp;