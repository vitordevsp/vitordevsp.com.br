# Board — PLAN-006 Pagina de Cursos

| ID | Descricao | Status | Depende de |
|----|-----------|--------|------------|
| P006-T001 | Definir schema de cursos, status e armazenamento da lista de espera | todo | — |
| P006-T002 | Criar dominio de cursos e pagina `/cursos` com cards | todo | PLAN-002 concluido, P006-T001 |
| P006-T003 | Criar formulario de lista de espera com estados de envio | todo | P006-T001, P006-T002 |
| P006-T004 | Implementar route handler com validacao e protecao minima | todo | P006-T001, P006-T003 |
| P006-T005 | Validar responsividade, acessibilidade do formulario e build | todo | P006-T002, P006-T003, P006-T004 |
