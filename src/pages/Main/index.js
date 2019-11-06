import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

export default class Main extends Component {
    state = {
        newRepository: '',
        repositories: [],
        loading: false,
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: true });

        const { newRepository, repositories } = this.state;
        try {
            const { data } = await api.get(`repos/${newRepository}`);
            const dataObj = {
                name: data.full_name,
            };

            this.setState({
                repositories: [...repositories, dataObj],
                newRepository: '',
            });
        } catch (error) {
            console.log('Unable to fetch repository info!');
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { newRepository, loading } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>
                <Form onSubmit={this.handleSubmit}>
                    <input
                        value={newRepository}
                        name="newRepository"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Adicionar repositório"
                    />
                    <SubmitButton loading={this.state.loading}>
                        {loading ? (
                            <FaSpinner color="#fff" size={14} />
                        ) : (
                            <FaPlus color="#fff" size={14} />
                        )}
                    </SubmitButton>
                </Form>
            </Container>
        );
    }
}
