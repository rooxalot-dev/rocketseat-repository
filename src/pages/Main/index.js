import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            newRepository: '',
            repositories: [],
            loading: false,
            error: false,
        };
    }

    componentDidMount() {
        const repositoriesJson = localStorage.getItem('rocket-repositories');
        const repostoriesArray = JSON.parse(repositoriesJson || '[]');

        this.setState({ repositories: repostoriesArray });
    }

    componentDidUpdate(prevProps, prevState) {
        const prevRepositories = prevState.repositories;

        if (prevRepositories && prevRepositories.length > 0) {
            localStorage.setItem(
                'rocket-repositories',
                JSON.stringify(prevRepositories)
            );
        }
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: true });
        this.setState({ error: false });

        const { newRepository, repositories } = this.state;
        try {
            if (!newRepository) {
                throw new Error('Novo repositório não foi especificado');
            }

            const existingRepository = repositories.find(
                r => r.name.toLowerCase() === newRepository.toLowerCase()
            );
            if (existingRepository) {
                throw new Error('Repositório duplicado');
            }

            const { data } = await api.get(`repos/${newRepository}`);
            const dataObj = {
                name: data.full_name,
            };

            this.setState({
                repositories: [...repositories, dataObj],
                newRepository: '',
            });
        } catch (error) {
            this.setState({ error: true });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { newRepository, repositories, loading } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>
                <Form
                    onSubmit={this.handleSubmit}
                    error={Number(this.state.error)}
                >
                    <input
                        value={newRepository}
                        name="newRepository"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Adicionar repositório"
                    />
                    <SubmitButton loading={Number(this.state.loading)}>
                        {loading ? (
                            <FaSpinner color="#fff" size={14} />
                        ) : (
                            <FaPlus color="#fff" size={14} />
                        )}
                    </SubmitButton>
                </Form>

                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
