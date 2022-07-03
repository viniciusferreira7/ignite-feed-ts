import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

interface Author  {
  avatarUrl:string;
  name:string;
  role:string;
};

interface Content {
    type: string,
    content: string;
  }
interface PostProps {
  author: Author;
  publishedAt: Date;
  content:Content[];
}


export function Post({ author, publishedAt, content }: PostProps) {
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'",{
    locale:ptBR
  })
  
  const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
    locale:ptBR,
    addSuffix:true
  })
  
  const [comments , setComments] = useState([
    'Post muito bacana, hein?!'
  ])

  const [ newCommentText, setNewCommentText ] = useState('')

  function handleCreateNewComment (event: FormEvent ) {
    event.preventDefault()

    setComments([...comments, newCommentText  ])
    setNewCommentText('');

  }

  function handleNewCommentChange (event: ChangeEvent<HTMLTextAreaElement> ) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid (event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function deleteComment (commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeleteOne);
  }

  const isCommentEmpty = newCommentText.length === 0

  return (
   <article className={styles.post}>
    <header>
      <div className={styles.author}>
        <Avatar src={author.avatarUrl}/>
        <div className={styles.authorInfo}>
          <strong>{author.name}</strong>
          <span>{author.role}</span>
        </div>
      </div>

      <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeNow}</time>
    </header>
    <div className={styles.content}>
      {content.map(line => {
        if (line.type == 'paragraph') {
          return <p key={line.content}>{line.content}</p>
        } else if (line.type == 'link') {
            return <p  key={line.content}><a href="#">{line.content}</a></p>
        }
      })}
    </div>

    <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
      <strong>Deixe seu feedback</strong>

      <textarea 
        onChange={handleNewCommentChange}
        name='comment'
        placeholder='Deixe um comentário'
        value={newCommentText}
        onInvalid={handleNewCommentInvalid}
        required
        />
     <footer>
      <button type="submit" disabled={isCommentEmpty}>Publicar</button>
     </footer>
    </form>
    <div className={styles.commentList}>
      {comments.map(comments => {
        return (
          <Comment 
            avatarUrl={author.avatarUrl}
            key={comments} 
            content={comments} 
            onDeleteComment={deleteComment}
          />
        )
      })}
    </div>
   </article>
  )
}
