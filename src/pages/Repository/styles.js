import styled from 'styled-components';

export const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #fff;
    font-size: 30px;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        text-decoration: none;
        font-size: 16px;
        color: #7159c1;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const IssueList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    select {
        margin-bottom: 30px;
        width: 100%;
        height: 30px;
        border: 1px solid #eee;
    }

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li {
            margin-top: 15px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1;
            margin-left: 15px;

            strong {
                font-size: 16px;
                cursor: pointer;

                a {
                    display: block;
                    margin-bottom: 10px;
                    text-decoration: none;
                    font-size: 16px;
                    color: #333;
                    transition: all 0.2s ease-in-out;

                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background-color: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 5px;

                    & + span {
                        margin: 5px;
                    }
                }
            }

            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
    }
`;

export const PaginationContainer = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const PaginationButton = styled.button.attrs(props => ({
    disabled: props.disabled,
}))`
    padding: 10px;
    font-size: 14px;
    color: #fff;
    background-color: #7159c1;
    border: none;
    border-radius: 4px;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;
