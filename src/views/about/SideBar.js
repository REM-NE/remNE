import React, { useEffect, useState } from "react";
import "./SideBar.css";
import dennys from "../../assets/images/dennys-leite.png";


const defaultDataInsituicoes = {
  ce: [
    {
      id: "ufc",
      acronym: "UFC",
      name: "Universidade Federal do Ceará",
      city: "Fortaleza/CE",
    },
    {
      id: "uece",
      acronym: "UECE",
      name: "Universidade Estadual do Ceará",
      city: "Fortaleza/CE",
    },
    {
      id: "ifce",
      acronym: "IFCE",
      name: "Instituto Federal do Ceará",
      city: "Fortaleza/CE",
    },
  ],
};

const defaultProfessoresData = [
  {
    id: 1,
    acronym: "UFC",
    nome: "Prof. Dr. Dennys Leite Maia",
    email: "dennys.maia@ufc.br",
    avatar: dennys,
    iniciais: null,
    lattesUrl: "#",
  },
  {
    id: 2,
    acronym: "UFC",
    nome: "Prof. Dr. Carlos Oliveira",
    email: "carlos.oliveira@ufc.br",
    avatar: null,
    iniciais: "DCO",
    lattesUrl: "#",
  },
  {
    id: 3,
    acronym: "UFC",
    nome: "Prof. Dra. Ana Rodrigues",
    email: "ana.rodrigues@ufc.br",
    avatar: null,
    iniciais: "DAR",
    lattesUrl: "#",
  },
  {
    id: 4,
    acronym: "UFC",
    nome: "Prof. Dr. Pedro Almeida",
    email: "pedro.almeida@ufc.br",
    avatar: null,
    iniciais: "DPA",
    lattesUrl: "#",
  },
];

function SideBar({
  activeState,
  activeStateName,
  data = defaultDataInsituicoes,
}) {
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  const institutions = activeState ? (data[activeState] ?? []) : [];

  const hasSelection = Boolean(activeState);

  /*
   * Sempre que o estado mudar, a instituição selecionada
   * volta para null.
   */
  useEffect(() => {
    setSelectedInstitution(null);
  }, [activeState]);

  /*
   * Quando uma instituição for selecionada,
   * procura os professores pertencentes a ela.
   *
   * Exemplo:
   * UFC -> professores cujo acronym === "UFC"
   */
  const professoresDaInstituicao = selectedInstitution
    ? defaultProfessoresData.filter(
        (professor) =>
          professor.acronym === selectedInstitution.acronym
      )
    : [];

  const handleInstitutionClick = (institution) => {
    setSelectedInstitution(institution);
  };

  /*
   * Nenhum estado selecionado
   */
  if (!hasSelection) {
    return (
      <aside className="side-bar" aria-live="polite">
        <div className="side-bar__subtitle-state">
          <h2 className="side-bar__title">
            Clique em um dos estados em vermelho
          </h2>

          <p className="side-bar__subtitle-text">
            Nenhum estado foi selecionado.
          </p>
        </div>
      </aside>
    );
  }

  /*
   * Uma instituição foi selecionada
   */
  if (selectedInstitution) {
    return (
      <aside className="side-bar" aria-live="polite">
        <div className="side-bar__header">
          <button
            type="button"
            className="side-bar__back"
            onClick={() => setSelectedInstitution(null)}
          >
            ← Voltar para as instituições
          </button>

          <div className="side-bar__institution-header">
            <h2 className="side-bar__title">
              {selectedInstitution.acronym} -{" "}
              {selectedInstitution.name}
            </h2>

            <p className="side-bar__detail-city">
              {selectedInstitution.city}
            </p>
          </div>
        </div>

        <div className="side-bar__professors">
          {professoresDaInstituicao.map((professor) => (
            <div
              key={professor.id}
              className="side-bar__professor"
            >
              <div className="side-bar__professor-avatar">
                {professor.avatar ? (
                  <img
                    src={professor.avatar}
                    alt={professor.nome}
                  />
                ) : (
                  <span>{professor.iniciais}</span>
                )}
              </div>

              <div className="side-bar__professor-info">
                <strong>{professor.nome}</strong>

                <span>{professor.email}</span>
              </div>

              <a
                href={professor.lattesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="side-bar__lattes"
              >
                Currículo Lattes
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          ))}
        </div>

        <hr className="separator" />
      </aside>
    );
  }
  
  return (
    <aside className="side-bar" aria-live="polite">
      <div className="side-bar__header">
        <div className="title-row">
          <svg
            width="13"
            height="16"
            viewBox="0 0 13 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.73343 14.2006C7.9733 13.1298 11.6656 9.6628 11.6656 6.33383C11.6656 4.91921 11.1038 3.56253 10.1037 2.56224C9.10357 1.56196 7.74715 1 6.3328 1C4.91845 1 3.56203 1.56196 2.56194 2.56224C1.56185 3.56253 1 4.91921 1 6.33383C1 9.6628 4.6923 13.1298 5.93217 14.2006C6.04768 14.2874 6.18828 14.3344 6.3328 14.3344C6.47732 14.3344 6.61792 14.2874 6.73343 14.2006Z"
              stroke="#8B1A1A"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <h2 className="side-bar__title">
            {activeStateName}
          </h2>
        </div>

        {institutions.length > 0 && (
          <p className="subtitle">
            {institutions.length} instituições encontradas.
          </p>
        )}
      </div>

      {institutions.length > 0 ? (
        <ul className="side-bar__list">
          {institutions.map((institution) => (
            <li
              key={institution.id}
              className="side-bar__item-wrap"
            >
              <button
                type="button"
                className="side-bar__item"
                onClick={() =>
                  handleInstitutionClick(institution)
                }
              >
                <span className="side-bar__item-copy side-bar__subtitle-text">
                  <strong>
                    {institution.acronym} -{" "}
                    {institution.name}
                  </strong>

                  <small className="side-bar__subtitle-text">
                    {institution.city}
                  </small>
                </span>

                <span
                  className="side-bar__item-arrow"
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="side-bar__subtitle">
          Nenhuma instituição cadastrada para este estado.
        </p>
      )}

      <hr className="separator" />
    </aside>
  );
}

export { defaultDataInsituicoes };
export { defaultProfessoresData };

export default SideBar;