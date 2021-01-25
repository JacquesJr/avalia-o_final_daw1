import { useEffect, useState } from 'react';

import { useAuth } from '../hooks/auth';
import api from '../api';
import { Container, Content } from '../styles/Home';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { useToast } from '../hooks/toast';

const Home = () => {
  const { token } = useAuth()
  const { addToast } = useToast();
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await api.get('/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });  
      setEvents(data)      
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao buscar os eventos',
      });
      console.log(err)
    }
  }, []);

  return (
    <Container>
      <SearchBar />
      <Content>
        {events.map(event => <Card key={event.id} data={event} />)}
      </Content>
    </Container>
  )
}

export default Home;