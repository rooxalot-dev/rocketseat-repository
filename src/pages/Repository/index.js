import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import {
    Loading,
    Owner,
    IssueList,
    PaginationContainer,
    PaginationButton,
} from './styles';

export default class Repository extends Component {
    state = {
        repository: {},
        issues: [],
        currentPage: 1,
        issueFilter: 'open',
        issueFilterStates: [
            { key: 'all', value: 'Todas' },
            { key: 'open', value: 'Abertas' },
            { key: 'closed', value: 'Fechadas' },
        ],
        loading: true,
    };

    async componentDidMount() {
        this.getRepositoryData();
    }

    getRepositoryData = async () => {
        this.setState({ loading: true });

        try {
            const { match } = this.props;
            const { params } = match;
            const { issueFilter, currentPage } = this.state;
            const repositoryName = decodeURIComponent(params.repository) || '';

            const [repository, issues] = await Promise.all([
                api.get(`/repos/${repositoryName}`),
                api.get(`/repos/${repositoryName}/issues`, {
                    params: {
                        state: issueFilter || 'open',
                        page: currentPage,
                        per_page: 5,
                    },
                }),
            ]);

            this.setState({
                loading: false,
                repository: repository.data,
                issues: issues.data,
            });
        } catch (error) {
            this.setState({ loading: true });
            console.log(error);
        }
    };

    handleSelectChange = async e => {
        await this.setState({ issueFilter: e.currentTarget.value });
        this.getRepositoryData();
    };

    handlePageChange = async direction => {
        const { currentPage } = this.state;
        if (direction === 'next') {
            await this.setState({ currentPage: currentPage + 1 });
        } else {
            await this.setState({ currentPage: currentPage - 1 });
        }

        this.getRepositoryData();
    };

    render() {
        const {
            loading,
            repository,
            issues,
            currentPage,
            issueFilterStates,
            issueFilter,
        } = this.state;

        if (loading) {
            return <Loading>Carregando</Loading>;
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>
                <IssueList>
                    <select
                        onChange={this.handleSelectChange}
                        value={issueFilter}
                    >
                        {issueFilterStates.map(issueState => (
                            <option key={issueState.key} value={issueState.key}>
                                {issueState.value}
                            </option>
                        ))}
                    </select>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                    <PaginationContainer>
                        <PaginationButton
                            onClick={() => this.handlePageChange('previous')}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </PaginationButton>
                        <PaginationButton
                            onClick={() => this.handlePageChange('next')}
                        >
                            Próximo
                        </PaginationButton>
                    </PaginationContainer>
                </IssueList>
            </Container>
        );
    }
}
