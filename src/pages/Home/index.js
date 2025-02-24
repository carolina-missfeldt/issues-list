import React, {useCallback, useState, useEffect} from 'react';
import { Container, Title, Form, SubmitButton, List } from './styles'; 
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa';
import api from '../../services/api';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
export default function Home() {

    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    function handleInputChange(e) {
        setNewRepo(e.target.value);
        setHasError(false);
    }

    const handleSubmit = useCallback(async (e) => { 
        e.preventDefault();
        setLoading(true);
        setHasError(false);
        try {
            if(newRepo === '') {
                throw new Error('Você precisa indicar um repositório');
            }
            const response = await api.get(`repos/${newRepo}`);

            const hasRepo = repositories.find(repo => repo.name === response.data.full_name);
            if(hasRepo) {
                throw new Error('Repositório duplicado');
            }
            const data = {
                name: response?.data?.full_name
            };
            if(data) {
                setRepositories([...repositories, data]);
                setNewRepo('');

            }
        } catch (error) {
            console.log(error);
            setHasError(true);
        } finally {
            setLoading(false);  
        }
    }, [newRepo, repositories]);

    useEffect(() => {
        if(repositories.length > 0) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }, [repositories]);

    useEffect(() => {
        const storagedRepositories = localStorage.getItem('repositories');
        if(storagedRepositories) {
            setRepositories(JSON.parse(storagedRepositories));
        }
    }, []);

    const removeRepository = useCallback((repository) => {
        const newRepositories = repositories.filter(repo => repo.name !== repository);
        setRepositories(newRepositories);
    }, [repositories]);

    return (
        <Container>
            <Title>
                Meus repositórios
                <FaGithub size={24} style={{marginLeft: 10}}/>
            </Title>
            <Form onSubmit={handleSubmit} withError={hasError}>
                <input 
                    type="text"
                    placeholder="Usuário/Repositório"
                    value={newRepo}
                    onChange={handleInputChange}
                />
                <SubmitButton loading={loading}>
                    {loading ? (<FaSpinner size={14}> </FaSpinner>) : (<FaPlus size={14} />)}
                </SubmitButton>
            </Form>
            <List>
                {repositories.map(repository => (
                    <li key={repository.name}>
                        <span>{repository.name}</span>
                        <div>
                        <Link to={`/repositorio/${encodeURIComponent(repository.name)}`}><FaBars size={14}></FaBars></Link>
                        <button onClick={() => removeRepository(repository.name)}><FaTrash></FaTrash></button>
                        </div>
                    </li>
                ))}
            </List>
        </Container>
    );
} 