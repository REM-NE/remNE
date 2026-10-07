import React, { useEffect, useState } from "react";
import "./SideBar.css";
import dennys from "../../assets/images/dennys-leite.png";

const data = {
  "estados": [
    {
      "id": 1,
      "nome": "Alagoas",
      "sigla": "AL",
      "instituicoes": [
        {
          "nome": "Universidade Federal de Alagoas",
          "sigla": "UFAL",
          "membros": [
            {
              "nome": "Carloney Alves de Oliveira",
              "email": "carloneyalves@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/9900433024242592",
              "url_imagem": "https://i.imgur.com/I5jRMUU.jpeg"
            },
            {
              "nome": "Wilker Araujo de Melo",
              "email": "wilker.melo@penedo.ufal.br",
              "link_lattes": "http://lattes.cnpq.br/5536949000134139",
              "url_imagem": "https://i.imgur.com/fPMQ5LY.jpeg"
            },
            {
              "nome": "Mariana Tenório da Silva Lima",
              "email": "mariana.lima@cedu.ufal.br",
              "link_lattes": "http://lattes.cnpq.br/6342860968467278",
              "url_imagem": "https://i.imgur.com/b2uFamp.png"
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "nome": "Bahia",
      "sigla": "BA",
      "instituicoes": [
        {
          "nome": "Universidade Estadual de Santa Cruz",
          "sigla": "UESC",
          "membros": [
            {
              "nome": "Douglas Alves Pimentel",
              "email": "prof.douglasestudante@uesc.br",
              "link_lattes": "http://lattes.cnpq.br/6007102831536231",
              "url_imagem": "https://i.imgur.com/4hditFs.jpeg"
            },
            {
              "nome": "Maria Elizabete Souza Couto",
              "email": "melizabetesc@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/1085573737741686",
              "url_imagem": "https://i.imgur.com/04hp8Q6.jpeg"
            },
            {
              "nome": "Tamiles da Silva Oliveira",
              "email": "tsoliveira1@uesc.br",
              "link_lattes": "https://lattes.cnpq.br/3635270256500147",
              "url_imagem": "https://i.imgur.com/BY229h9.jpeg"
            },
            {
              "nome": "Juana Maria Arrieta Arrieta",
              "email": "juanaarrietaarrieta@gmail.com",
              "link_lattes": "https://lattes.cnpq.br/1209387388271724",
              "url_imagem": "https://i.imgur.com/O5o7Jkw.png"
            },
            {
              "nome": "John Leon de Almeida Moura",
              "email": "johnleon.a.moura@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/3306774751465129",
              "url_imagem": "https://i.imgur.com/AhNBfwa.jpeg"
            },
            {
              "nome": "Açucena Araújo Martins",
              "email": "aamartins.ppgecm@uesc.br",
              "link_lattes": "http://lattes.cnpq.br/9400544275421195",
              "url_imagem": "https://i.imgur.com/fjsdypy.jpeg"
            },
            {
              "nome": "Maria Margarete do Rosário Farias",
              "email": "mfarias@uesc.br",
              "link_lattes": "http://lattes.cnpq.br/5188230538300491",
              "url_imagem": "https://i.imgur.com/r8M2CKu.jpeg"
            },
            {
              "nome": "Saray Carolina Carrillo Paternina",
              "email": "Scarrillopaternina@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/2370171310526099",
              "url_imagem": "https://i.imgur.com/JPtYfk2.jpeg"
            },
            {
              "nome": "Alexandre da Silva Souza",
              "email": "assouza.lm@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/2356721216952616",
              "url_imagem": "https://i.imgur.com/M8R7mBu.jpeg"
            },
            {
              "nome": "Felipe de Almeida Mendonça Falcão",
              "email": "felipefalcao509@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/1990473602266449",
              "url_imagem": "https://i.imgur.com/Q3wWQZ7.jpeg"
            },
            {
              "nome": "Manoel Silva Duarte",
              "email": "mandumat@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/3647831967900302",
              "url_imagem": "https://i.imgur.com/ocY5Tnl.jpeg"
            },
            {
              "nome": "Maria Vitória Santos da Silva",
              "email": "mariavitoriasantos935@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/4989655485645640",
              "url_imagem": "https://i.imgur.com/JW5EhnP.jpeg"
            },
            {
              "nome": "Diná da Silva Correia",
              "email": "dina.uesc@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/7352431804016598",
              "url_imagem": "https://i.imgur.com/VoTz304.jpeg"
            }
          ]
        },
        {
          "nome": "Universidade Estadual do Sudoeste da Bahia",
          "sigla": "UESB",
          "membros": [
            {
              "nome": "José Erliton Santos Santana",
              "email": "erllytonsantana@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/8213894906447308",
              "url_imagem": "https://i.imgur.com/fbvvcqO.jpeg"
            },
            {
              "nome": "Adriano Santos Lago",
              "email": "adrianolago79@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/3842192715298984",
              "url_imagem": "https://i.imgur.com/SmLCML2.jpeg"
            }
          ]
        },
        {
          "nome": "Universidade Estadual de Feira de Santana",
          "sigla": "UEFS",
          "membros": [
            {
              "nome": "Wériton de Souza Lôbo",
              "email": "weritonslobo@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/3430308434058450",
              "url_imagem": "https://i.imgur.com/06qRRXO.jpeg"
            }
          ]
        },
        {
          "nome": "Universidade Federal do Sul da Bahia",
          "sigla": "UFSB",
          "membros": [
            {
              "nome": "Luana Cerqueira de Almeida Moura",
              "email": "luanacerqueira@ufsb.edu.br",
              "link_lattes": "http://lattes.cnpq.br/1200968379687794",
              "url_imagem": "https://i.imgur.com/d78UDw2.jpeg"
            }
          ]
        },
        {
          "nome": "Secretaria Municipal de Educação de Itabuna-BA",
          "sigla": "SME-Itabuna",
          "membros": [
            {
              "nome": "Silvana Carvalho de Almeida",
              "email": "siilvanacarvalho2022@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/5743295491804586",
              "url_imagem": "https://i.imgur.com/DYCQslr.png"
            }
          ]
        },
        {
          "nome": "Centro de Atenção Integral a Criança - CAIC, Centro Integrado Cristo Redentor",
          "sigla": "CAIC",
          "membros": [
            {
              "nome": "Lucivânia da Silva Costa Ribeiro",
              "email": "lucivaniacostaribeiro01@gmail.com",
              "link_lattes": "https://lattes.cnpq.br/2248122283645968",
              "url_imagem": "https://i.imgur.com/CDwNoke.jpeg"
            }
          ]
        },
        {
          "nome": "Secretaria Municipal de Educação de São José da Vitória-BA",
          "sigla": "SME-SJV",
          "membros": [
            {
              "nome": "Geníria Almeida dos Santos Souza",
              "email": "janasouza10@yahoo.com",
              "link_lattes": "http://lattes.cnpq.br/6715420279974005",
              "url_imagem": "https://i.imgur.com/mp5sV63.png"
            }
          ]
        },
        {
          "nome": "Escola Beabá",
          "sigla": "BEABÁ",
          "membros": [
            {
              "nome": "Daniela Paulo dos Santos",
              "email": "danilfs.mat@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/5683083039329504",
              "url_imagem": "https://i.imgur.com/64A7zro.jpeg"
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "nome": "Ceará",
      "sigla": "CE",
      "instituicoes": [
        {
          "nome": "Instituto Federal de Educação, Ciência e Tecnologia do Ceará",
          "sigla": "IFCE",
          "membros": [
            {
              "nome": "Milena Vasconcelos Gomes",
              "email": "myllenavg@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/8377367336118430",
              "url_imagem": "https://i.imgur.com/5oYEcXQ.jpeg"
            },
            {
              "nome": "Daniel da Silva Rocha",
              "email": "Daniel.srocha.011@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/5150163471227976",
              "url_imagem": "https://i.imgur.com/xb93BLN.jpeg"
            },
            {
              "nome": "Francisco Marcelo Bezerra Paiva",
              "email": "marcelopaiva66@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/4852062527286728",
              "url_imagem": "https://i.imgur.com/QqxsiEZ.jpeg"
            }
          ]
        },
        {
          "nome": "Universidade Estadual do Ceará",
          "sigla": "UECE",
          "membros": [
            {
              "nome": "Gisele Pereira Oliveira",
              "email": "giselep.oliveira@uece.br",
              "link_lattes": "http://lattes.cnpq.br/7397794792402006",
              "url_imagem": "https://i.imgur.com/Uom4Umz.jpeg"
            }
          ]
        },
        {
          "nome": "Universidade Federal do Ceará",
          "sigla": "UFC",
          "membros": [
            {
              "nome": "Juscileide Braga de Castro",
              "email": "juscileide@virtual.ufc.br",
              "link_lattes": "http://lattes.cnpq.br/2525374702919730",
              "url_imagem": "https://i.imgur.com/yBraHNO.jpeg"
            },
            {
              "nome": "Juliana Evaristo Costa",
              "email": "julianaecosta@alu.ufc.br",
              "link_lattes": "http://lattes.cnpq.br/9656110497934224",
              "url_imagem": "https://i.imgur.com/sxg6aUT.jpeg"
            }
          ]
        },
        {
          "nome": "Universidade Federal do Cariri",
          "sigla": "UFCA",
          "membros": [
            {
              "nome": "Rodrigo Lacerda Carvalho",
              "email": "rodrigo.lacerda@ufca.edu.br",
              "link_lattes": "http://lattes.cnpq.br/2352144605333782",
              "url_imagem": "https://i.imgur.com/hZKjMra.jpeg"
            },
            {
              "nome": "Edicarlos Pereira de Sousa",
              "email": "edicarlos.pereira@ufca.edu.br",
              "link_lattes": "http://lattes.cnpq.br/7323917846678454",
              "url_imagem": "https://i.imgur.com/2NArUcp.jpeg"
            },
            {
              "nome": "José Valdelaneo David Sousa Nunes",
              "email": "jose.valdelaneo@aluno.ufca.edu.br",
              "link_lattes": "http://lattes.cnpq.br/5429692323928237",
              "url_imagem": "https://i.imgur.com/KNJSqBj.jpeg"
            }
          ]
        },
        {
          "nome": "Universidade Regional do Cariri",
          "sigla": "URCA",
          "membros": [
            {
              "nome": "Ana Cecília Figueirêdo Leite",
              "email": "cecilia.figueiredo@urca.br",
              "link_lattes": "http://lattes.cnpq.br/4576154016940266",
              "url_imagem": "https://i.imgur.com/PDwuJjH.jpeg"
            }
          ]
        },
        {
          "nome": "Universidade da Integração Internacional da Lusofonia Afro-Brasileira",
          "sigla": "UNILAB",
          "membros": [
            {
              "nome": "Joserlene Lima Pinheiro",
              "email": "lenopinheiro@unilab.edu.br",
              "link_lattes": "http://lattes.cnpq.br/0550110355199189",
              "url_imagem": "https://i.imgur.com/UNZx7Tj.jpeg"
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "nome": "Pernambuco",
      "sigla": "PE",
      "instituicoes": [
        {
          "nome": "Universidade Federal de Pernambuco",
          "sigla": "UFPE",
          "membros": [
            {
              "nome": "Sintria Labres Lautert",
              "email": "sintria.lautert@ufpe.br",
              "link_lattes": "http://lattes.cnpq.br/1825422952986771",
              "url_imagem": "https://i.imgur.com/X8Cf1XN.jpeg"
            }
          ]
        },
        {
          "nome": "Universidade de Pernambuco",
          "sigla": "UPE",
          "membros": [
            {
              "nome": "Ernani Martins dos Santos",
              "email": "ernani.santos@upe.br",
              "link_lattes": "http://lattes.cnpq.br/2183864514413741",
              "url_imagem": "https://i.imgur.com/D5WCZO4.jpeg"
            }
          ]
        }
      ]
    },
    {
      "id": 5,
      "nome": "Rio Grande do Norte",
      "sigla": "RN",
      "instituicoes": [
        {
          "nome": "Universidade Federal do Rio Grande do Norte",
          "sigla": "UFRN",
          "membros": [
            {
              "nome": "Lucas Toshio Nascimento da Silva",
              "email": "tosh.sam@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/5429692323928237",
              "url_imagem": "https://i.imgur.com/a94J3cv.jpeg"
            },
            {
              "nome": "Carmélia Regina Silva Xavier",
              "email": "carmeliaxavierxavier@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/0366500502646513",
              "url_imagem": "https://i.imgur.com/H8OcNPP.jpeg"
            },
            {
              "nome": "Brunno Ferreira de Oliveira Santos",
              "email": "brunno.santos.106@ufrn.edu.br",
              "link_lattes": "http://lattes.cnpq.br/3462932568364829",
              "url_imagem": "https://i.imgur.com/tC6o5uT.png"
            },
            {
              "nome": "Dênis Rocha da Silva",
              "email": "denis.rocha.111@ufrn.edu.br",
              "link_lattes": "http://lattes.cnpq.br/1242640850027706",
              "url_imagem": "https://i.imgur.com/f77JrNj.jpeg"
            },
            {
              "nome": "Dennys Leite Maia",
              "email": "dennys@imd.ufrn.br",
              "link_lattes": "http://lattes.cnpq.br/4047293288281493",
              "url_imagem": "https://i.imgur.com/duBz40k.jpeg"
            },
            {
              "nome": "Samuel Anderson Machado Lopes",
              "email": "samuel.lopes.121@ufrn.edu.br",
              "link_lattes": "http://lattes.cnpq.br/9708412519196484",
              "url_imagem": "https://i.imgur.com/W54EPUr.png"
            },
            {
              "nome": "José Rodrigues da Silva Filho",
              "email": "professor.rodriguess@gmail.com",
              "link_lattes": "http://lattes.cnpq.br/7837239267365682",
              "url_imagem": "https://i.imgur.com/Cq6MLq5.jpeg"
            },
            {
              "nome": "Lidiane Carla de Moura",
              "email": "lidianecnatal@gmail.com",
              "link_lattes": "https://lattes.cnpq.br/9889835203617579",
              "url_imagem": "https://i.imgur.com/wCzxrOC.jpeg"
            }
          ]
        }
      ]
    }
  ]
}


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
 
  useEffect(() => {
    setSelectedInstitution(null);
  }, [activeState]);
 
  const professoresDaInstituicao = selectedInstitution
    ? defaultProfessoresData.filter(
        (professor) =>
          professor.acronym === selectedInstitution.acronym
      )
    : [];

  const handleInstitutionClick = (institution) => {
    setSelectedInstitution(institution);
  };
  
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