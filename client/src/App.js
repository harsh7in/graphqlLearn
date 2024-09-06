import logo from './logo.svg';
import { useQuery,gql } from '@apollo/client';

import './App.css';

const query = gql`
  query Query {
  getTodos {
    id
    title
  }
}
`

function App() {
  const { data, loading} = useQuery(query);
  
  if(loading) {
         return <h1>loading....</h1>
        }
  return (
    <div>hello 
      <div>
        {
          data.getTodos.map(todo => (
            <div key={todo.id}>
              {todo.title}
            </div>
          ))
        }
      </div>

    </div>
  );
}

export default App;
