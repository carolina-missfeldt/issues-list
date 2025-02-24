import React, { useState, useEffect } from "react";
import {
  Container,
  Owner,
  BackButton,
  Loading,
  IssuesList,
  Pagination,
  SelectStatus
} from "./style";
import api from "../../services/api";
import {
  FaArrowLeft,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Repositories({ match }) {
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('all');
  useEffect(() => {
    const repo = decodeURIComponent(match.params.repo);
    setError(false);
    async function load() {
      try {
        const [repoData, issues] = await Promise.all([
          api.get(`/repos/${repo}`),
          api.get(`/repos/${repo}/issues`, {
            params: {
              state: "all",
              per_page: 5,
            },
          }),
        ]);
        setRepo(repoData.data);
        setIssues(issues.data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [match.params.repo]);

  useEffect(() => {
    const repo = decodeURIComponent(match.params.repo);
    async function listIssues() {
      try {
        const issuesData = await api.get(`/repos/${repo}/issues`, {
          params: {
            state: status,
            per_page: 5,
            page
          },
        });
        setIssues(issuesData.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    listIssues();
  }, [match.params.repo, page, status]);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }
  return (
    <Container>
      <BackButton>
        <Link to="/">
          <FaArrowLeft color="#000" size={20} />
        </Link>
      </BackButton>
      <Owner>
        <div>
          <img src={repo.owner?.avatar_url} alt={repo.owner?.login} />
          <h1>{repo.name}</h1>
        </div>
        <p>{repo.description}</p>
      </Owner>
      <SelectStatus>
        <div>
            <label htmlFor="status">Status da Issue</label>
            <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
            >
                <option value="all">Todas</option>
                <option value="open">Abertas</option>
                <option value="closed">Fechadas</option>
            </select>
        </div>
      </SelectStatus>
      <IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url} target="_blank" rel="noreferrer">
                  {issue.title}
                </a>
                {issue.labels.map((label) => (
                  <span key={String(label.id)} className="tag">
                    {label.name}
                  </span>
                ))}
              </strong>
              <p className="user">{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
      <Pagination>
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          title="Anterior"
          disabled={page < 2}
        >
          <FaArrowAltCircleLeft color="#000" size={20} />
        </button>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          title="Próximo"
          disbled={issues.length === 0 || error}
        >
          <FaArrowAltCircleRight color="#000" size={20} />
        </button>
      </Pagination>
    </Container>
  );
}
