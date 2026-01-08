-- Seed Data for Products (Courses and Simulations)

-- Courses
INSERT INTO public.products (title, description, price, type, metadata) VALUES
('Intensivo ENEM 2026', 'O curso completo com todas as matérias para quem quer começar do zero e garantir a aprovação este ano.', 49700, 'course', '{"duration": "10 meses", "level": "Completo"}'),
('Matemática do Zero ao 800+', 'Domine a matemática básica e avançada com foco total na interpretação de questões do ENEM.', 19700, 'course', '{"duration": "4 meses", "level": "Intermediário"}'),
('Redação Nota 1000', 'Aprenda a estrutura perfeita, repertório sociocultural e como não zerar na redação mais importante do ano.', 14700, 'course', '{"duration": "3 meses", "level": "Todos os níveis"}'),
('Ciências da Natureza Descomplicada', 'Física, Química e Biologia explicadas de forma simples e direta, com muitos exercícios resolvidos.', 24700, 'course', '{"duration": "5 meses", "level": "Avançado"}'),
('Humanas Total', 'História, Geografia, Filosofia e Sociologia. Entenda o mundo e gabarite a prova de Humanas.', 19700, 'course', '{"duration": "4 meses", "level": "Completo"}'),
('Revisão Final ENEM', 'O conteúdo mais quente e as apostas dos professores para a prova, resumidos em 1 mês de aula.', 9700, 'course', '{"duration": "1 mês", "level": "Revisão"}');

-- Simulations
INSERT INTO public.products (title, description, price, type, metadata) VALUES
('Simulado Nacional #1', 'Prova completa com 180 questões + Redação. Modelo exato do ENEM 2025.', 4990, 'simulation', '{"questions": "180 questões", "type_label": "2 dias de prova"}'),
('Simulado Ciências da Natureza', 'Foco total em Física, Química e Biologia. Ideal para treinar tempo e conteúdo específico.', 2990, 'simulation', '{"questions": "45 questões", "type_label": "Área Específica"}'),
('Simulado Matemática', '45 questões de matemática para você testar sua resistência e estratégia de resolução.', 2990, 'simulation', '{"questions": "45 questões", "type_label": "Área Específica"}'),
('Simulado Linguagens + Humanas', 'Treine o primeiro dia de prova com questões inéditas e atualizadas.', 3990, 'simulation', '{"questions": "90 questões", "type_label": "1º Dia"}'),
('Simulado Teste (Integração)', 'Simulado de valor simbólico para testar o fluxo de pagamento real.', 100, 'simulation', '{"questions": "5 questões", "type_label": "Teste"}');
