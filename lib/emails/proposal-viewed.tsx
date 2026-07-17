export interface ProposalViewedEmailProps {
  titulo: string;
  endereco: string;
  cidade: string;
  viewedAt: string;
  dashboardUrl: string;
}

export function ProposalViewedEmail({
  titulo,
  endereco,
  cidade,
  viewedAt,
  dashboardUrl,
}: ProposalViewedEmailProps) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#0D0D16",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: "#0D0D16", padding: "40px 16px" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  role="presentation"
                  width="100%"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    maxWidth: "520px",
                    backgroundColor: "#14141F",
                    borderRadius: "12px",
                    border: "1px solid rgba(196, 146, 10, 0.22)",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: "28px 32px 20px",
                          borderBottom: "1px solid rgba(196, 146, 10, 0.22)",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: "13px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            color: "#C4920A",
                            textTransform: "uppercase",
                          }}
                        >
                          ELEVO
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ padding: "28px 32px" }}>
                        <h1
                          style={{
                            margin: "0 0 16px",
                            fontSize: "20px",
                            fontWeight: 600,
                            lineHeight: 1.4,
                            color: "#F7F2EA",
                          }}
                        >
                          Seu cliente abriu sua proposta
                        </h1>

                        <p
                          style={{
                            margin: "0 0 24px",
                            fontSize: "15px",
                            lineHeight: 1.6,
                            color: "#7A7A8A",
                          }}
                        >
                          Alguém acabou de abrir sua proposta &ldquo;{titulo}
                          &rdquo; em {cidade}. Este é o momento certo para
                          entrar em contato!
                        </p>

                        <table
                          role="presentation"
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          style={{
                            backgroundColor: "#0D0D16",
                            borderRadius: "8px",
                            border: "1px solid rgba(196, 146, 10, 0.22)",
                            marginBottom: "28px",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ padding: "16px 20px" }}>
                                <p
                                  style={{
                                    margin: "0 0 8px",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    color: "#7A7A8A",
                                  }}
                                >
                                  Detalhes do acesso
                                </p>
                                <p
                                  style={{
                                    margin: "0 0 4px",
                                    fontSize: "14px",
                                    color: "#F7F2EA",
                                  }}
                                >
                                  <strong>Título:</strong> {titulo}
                                </p>
                                <p
                                  style={{
                                    margin: "0 0 4px",
                                    fontSize: "14px",
                                    color: "#F7F2EA",
                                  }}
                                >
                                  <strong>Endereço:</strong> {endereco}
                                </p>
                                <p
                                  style={{
                                    margin: "0 0 4px",
                                    fontSize: "14px",
                                    color: "#F7F2EA",
                                  }}
                                >
                                  <strong>Cidade:</strong> {cidade}
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: "14px",
                                    color: "#F7F2EA",
                                  }}
                                >
                                  <strong>Data/hora:</strong> {viewedAt}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table role="presentation" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  borderRadius: "8px",
                                  backgroundColor: "#C4920A",
                                }}
                              >
                                <a
                                  href={dashboardUrl}
                                  style={{
                                    display: "inline-block",
                                    padding: "14px 28px",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "#0D0D16",
                                    textDecoration: "none",
                                  }}
                                >
                                  Ver proposta no dashboard
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "20px 32px 28px",
                          borderTop: "1px solid rgba(196, 146, 10, 0.22)",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "#7A7A8A",
                            textAlign: "center",
                          }}
                        >
                          Propostas imobiliárias com ELEVO
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

export function getProposalViewedSubject(titulo: string): string {
  return `Seu cliente abriu a proposta: ${titulo}`;
}
