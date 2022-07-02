import React from 'react';
import { Header } from './components/Header';
import { Post } from './components/Post';

import styles from './App.module.css'

import './global.css';
import { Sidebar } from './components/Sidebar';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl:'https://avatars.githubusercontent.com/u/83302144?v=4',
      name:'Vinicius De Aquino',
      role:'Front End Developer'
    },
    content:[
      {
        type:'paragraph', content: 'Fala galeraa👋'
      },
      {
        type:'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        type:'link', content :'jane.design/doctorcare'
      }
    ],
    publishedAt: new Date('2022-06-28 18:27'),
  },
  {
    id: 2,
    author: {
      avatarUrl:'https://github.com/maykbrito.png',
      name:'Mayk Brito',
      role:'Educador @Rocketseat'
    },
    content:[
      {
        type:'paragraph', content: 'Fala galeraa👋'
      },
      {
        type:'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        type:'link', content :'jane.design/doctorcare'
      }
    ],
    publishedAt: new Date('2022-06-08 18:27'),
  },
]

export  function App() {
  return (
    <>
      <Header/>
      <div className={styles.wrapper}>
       <Sidebar/>
        <main>
          {posts.map(post => {
            return (
              <Post 
                key={post.id}
                author={post.author} 
                content={post.content} 
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}
