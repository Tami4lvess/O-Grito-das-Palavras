/* ========================================================
   O GRITO DAS PALAVRAS — app.js
   ======================================================== */

const COVERS = [
  { file:'assets/covers/dali.png',            name:'A Persistência da Memória (1931) — Salvador Dalí' },
  { file:'assets/covers/klimt.png',           name:'O Beijo (1907-08) — Gustav Klimt' },
  { file:'assets/covers/girassois.png',       name:'Os Girassóis (1888) — Vincent van Gogh' },
  { file:'assets/covers/monalisa.png',        name:'Mona Lisa (c.1503-19) — Leonardo da Vinci' },
  { file:'assets/covers/noite_estrelada.png', name:'Noite Estrelada (1889) — Vincent van Gogh' },
  { file:'assets/covers/guernica.png',        name:'Guernica (1937) — Pablo Picasso' },
  { file:'assets/covers/abaporu.png',         name:'Abaporu (1928) — Tarsila do Amaral' },
];

/* ══════════════════════════════════════════════════════════
   POOL DE ESTROFES — 40+ por tema
   A cada geração 4 são sorteadas sem repetição entre si.
   ══════════════════════════════════════════════════════════ */
const POOL = {

  romance: [
    { author:'Pablo Neruda', work:'Vinte Poemas de Amor (1924)',
      lines:'Posso escrever os versos mais tristes esta noite.\nEscrever, por exemplo: "A noite está estrelada,\ne tilintam, azuis, os astros, ao longe."\nO vento da noite gira no céu e canta.\nEu a amei, e às vezes ela também me amava.' },
    { author:'Pablo Neruda', work:'Vinte Poemas de Amor — Poema XV (1924)',
      lines:'Gosto que você me ame com olhos fechados,\ncom as mãos, com os lábios.\nGosto que me olhe de tal maneira\nque quando eu feche os olhos você ainda esteja lá.' },
    { author:'Pablo Neruda', work:'Soneto XVII — Cem Sonetos de Amor (1959)',
      lines:'Não te amo como se fosses rosa de sal, topázio\nou flecha de cravos que propagam o fogo:\nte amo como se amam certas coisas obscuras,\nsecretamente, entre a sombra e a alma.' },
    { author:'Pablo Neruda', work:'Odes Elementais (1954)',
      lines:'Quero fazer contigo\no que a primavera faz com as cerejeiras.' },
    { author:'Pablo Neruda', work:'Corpo de Mulher (1924)',
      lines:'Corpo de mulher, montanhas brancas, coxas brancas,\nassemelhas-te ao mundo em tua atitude de entrega.\nMeu corpo de lavrão selvagem te abala\ne faz saltar o filho do fundo da terra.' },
    { author:'Pablo Neruda', work:'A Canção Desesperada (1924)',
      lines:'Emerge tua lembrança do fundo da noite.\nO rio ata suas mãos obstinadas.\nPartiste para o longe.\nEstou só com tua presença.' },
    { author:'Florbela Espanca', work:'Livro de Sóror Saudade (1923)',
      lines:'Eu quero amar, amar perdidamente!\nAmar só por amar: aqui… além…\nMais Este e Aquele, o Outro e toda a gente…\nAmar! Amar! E não amar ninguém!' },
    { author:'Florbela Espanca', work:'Charneca em Flor (1931)',
      lines:'Sou a que no caminho andava perdida,\na que caiu e se não pôde erguer,\na que pediu e não foi atendida,\na que chamou e não houve quem a ouvisse.' },
    { author:'Florbela Espanca', work:'Amar (1931)',
      lines:'Amar é não dormir quando tu dormes,\né ter medo de ti quando te moves,\né sentir no silêncio os teus gemidos\ne chorar quando tu não chores.' },
    { author:'Florbela Espanca', work:'O Maior Bem (1923)',
      lines:'O amor é um deus que morre e que ressuscita.\né uma chama que apaga e que flameja,\num sonho que se foge e que se beija,\numa flor que se rompe e que se habita.' },
    { author:'Luís de Camões', work:'Sonetos — Rimas (séc. XVI)',
      lines:'Amor é fogo que arde sem se ver;\né ferida que dói e não se sente;\né um contentamento descontente;\né dor que desatina sem doer.' },
    { author:'Luís de Camões', work:'"Transforma-se o amador" (séc. XVI)',
      lines:'Transforma-se o amador na cousa amada,\npor virtude do muito imaginar;\nnão tenho, logo, mais que desejar,\npois em mim tenho a parte desejada.' },
    { author:'Luís de Camões', work:'"Alma minha gentil" (séc. XVI)',
      lines:'Alma minha gentil, que te partiste\ntão cedo desta vida descontente,\nrepousa lá no Céu eternamente,\ne viva eu cá na terra sempre triste.' },
    { author:'Fernando Pessoa (Álvaro de Campos)', work:'Lisbon Revisited (1923)',
      lines:'Não sou nada.\nNunca serei nada.\nNão posso querer ser nada.\nÀ parte isso, tenho em mim todos os sonhos do mundo.' },
    { author:'Fernando Pessoa (Ricardo Reis)', work:'Odes de Ricardo Reis (1914-1935)',
      lines:'Não ames, que o amor é uma sombra\nque passa e não volta.\nO que sentiste, sentiste; não penses\nque o amor se repete.' },
    { author:'Fernando Pessoa (ele mesmo)', work:'Cancioneiro (1934)',
      lines:'Não sei se é amor, ou é vaidade,\nou apenas uma solidão\nque procura uma outra solidão\npara juntas fazer companhia.' },
    { author:'Carlos Drummond de Andrade', work:'Corpo (1984)',
      lines:'Amar o perdido\ndeixa confundido\neste coração.\nNada pode o olvido\ncontra o sem sentido\napelo do Não.' },
    { author:'Carlos Drummond de Andrade', work:'Quadrilha (1930)',
      lines:'João amava Teresa que amava Raimundo\nque amava Maria que amava Joaquim que amava Lili\nque não amava ninguém.\nJoão foi para os Estados Unidos, Teresa para o convento,\nRaimundo morreu de desastre, Maria ficou para tia,\nJoaquim suicidou-se e Lili casou com J. Pinto Fernandes\nque não tinha entrado na história.' },
    { author:'Carlos Drummond de Andrade', work:'José (1942)',
      lines:'E agora, José?\nA festa acabou,\na luz apagou,\no povo sumiu,\na noite esfriou,\ne agora, José?' },
    { author:'Adélia Prado', work:'Bagagem (1976)',
      lines:'Com licença poética:\nquero um marido que saiba,\nnão o que se deve fazer,\nmas o que a carne manda.' },
    { author:'Adélia Prado', work:'O Coração Disparado (1978)',
      lines:'Não é o espelho que me diz\nque sou bela ou que sou feia.\nÉ o olhar de quem me ama\nquando meu nome ele nomeia.' },
    { author:'Cecília Meireles', work:'Amor em Leonoreta (1958)',
      lines:'Onde vai meu pensamento,\nnão sei, não sei.\nAonde vai o amor que sinto\ntambém não sei.' },
    { author:'Cecília Meireles', work:'Pistia (1958)',
      lines:'Flutuava a flor na água turva.\nTurva a água, bela a flor.\nAssim flutua meu amor:\nna água turva da dor.' },
    { author:'Emily Dickinson', work:'Poema 611 (ed. póstuma, 1890)',
      lines:'O coração pede prazer primeiro,\ndepois pede ser poupado da dor;\ndepois pede aqueles pequenos analgésicos\nque adormecem o sofrimento.' },
    { author:'Emily Dickinson', work:'Poema 249 (ed. póstuma, 1890)',
      lines:'Selvagem foi a noite\ncom a dor que te trouxe,\ne suave o fim da madrugada\nquando teu nome soprei.' },
    { author:'Rainer Maria Rilke', work:'Cartas a um Jovem Poeta (1929)',
      lines:'Amar é estar só junto a outro ser.\nÉ dar liberdade ao outro\ne ao mesmo tempo ficar.\nÉ o paradoxo mais belo do ar.' },
    { author:'Sophia de Mello Breyner', work:'Dia do Mar (1947)',
      lines:'Deste mar e desta praia\nvem uma voz que me chama.\nO amor, como o mar, se espraia\ne me abraça como a chama.' },
    { author:'Alphonsus de Guimaraens', work:'Câmara Ardente (1899)',
      lines:'Hão de chorar por ela os cinamomos,\nreclinando nos ares suas flores…\nhão de chorar os ermos e os pomos,\nenternecidos, mágicos, as flores.' },
    { author:'Cruz e Sousa', work:'Broquéis (1893)',
      lines:'Quero o teu amor eterno e fundo,\nquero o amor que nunca se esgota,\nquero o amor que atravessa o mundo\ncomo a mais profunda nota.' },
    { author:'Vinícius de Moraes', work:'Soneto de Fidelidade (1939)',
      lines:'De tudo ao meu amor serei atento\nantes, e com tal zêlo, e sempre, e tanto\nque mesmo em face do maior encanto\ndele se encante mais meu pensamento.' },
    { author:'Vinícius de Moraes', work:'A Arca de Noé (1970)',
      lines:'O amor é eterno enquanto dura.\né como flor: nasce, cresce, amadurece\ne, depois que dura, morre e some.\nMas que perfume enquanto floresce!' },
    { author:'Manuel Bandeira', work:'Pneumotórax (1930)',
      lines:'Febre, hemoptise, dispneia e suores noturnos.\nA vida inteira que podia ter sido e que não foi.\nTossi, tossi, tossi.\nDeu-me uma hemorrhagia de me por os pasmos.\nO homem riu-se.' },
    { author:'Manuel Bandeira', work:'Vou-me Embora pra Pasárgada (1930)',
      lines:'Vou-me embora pra Pasárgada\nLá sou amigo do rei\nLá tenho a mulher que eu quero\nNa cama que escolherei.' },
    { author:'Sophia de Mello Breyner', work:'Arte Poética (1967)',
      lines:'Eu vim ao mundo para ver,\nmais do que para entender.\nE o amor é isso:\nver o outro como ele é.' },
    { author:'Gilberto Gil', work:'Aquele Abraço (1969)',
      lines:'Quando o amor toca\na gente esquece o mundo.\nSó existe aquele abraço\ne o calor do fundo.' },
    { author:'José Saramago', work:'Cadernos de Lanzarote (1994)',
      lines:'O amor não se pede.\nO amor não se implora.\nO amor acontece\ne nunca demora.' },
    { author:'António Gedeão', work:'Poesia com Tudo (1956)',
      lines:'Há sempre um amanhã.\nHá sempre uma esperança.\nHá sempre um amor\nque o coração alcança.' },
    { author:'Eugénio de Andrade', work:'Adolescente (1948)',
      lines:'Cheira a sol o teu corpo.\nCheira a mar a tua boca.\nE os teus olhos são a cor\nda tarde quando a noite choca.' },
    { author:'Mário Quintana', work:'Caderno H (1973)',
      lines:'Só se pode viver plenamente\namando plenamente.\nO amor não é apenas sentir:\né também fazer sentir.' },
    { author:'Clarice Lispector', work:'A Hora da Estrela (1977)',
      lines:'Amor é quando eu olho para você\ne me vejo no seu olhar.\nAmor é quando duas solidões\ndecidissem se encontrar.' },
  ],

  politico: [
    { author:'Bertolt Brecht', work:'Poemas de Svendborg (1939)',
      lines:'Nos tempos sombrios\nhá ainda canto?\nHaverá ainda canto.\nSobre os tempos sombrios.' },
    { author:'Bertolt Brecht', work:'Aos que virão depois de nós (1939)',
      lines:'Viemos a tempos em que uma conversa sobre árvores\né quase um crime, pois implica silêncio\nsobre tantas atrocidades.' },
    { author:'Bertolt Brecht', work:'Perguntas de um trabalhador que lê (1935)',
      lines:'Quem construiu Tebas, a das sete portas?\nNos livros estão os nomes dos reis.\nArrastaram os reis os blocos de pedra?\nE a Babilônia, tantas vezes destruída,\nquem a reconstruiu sempre?' },
    { author:'Bertolt Brecht', work:'Elogio do Comunismo (1932)',
      lines:'É razoável. Qualquer um pode entendê-lo.\nÉ fácil. Você não é explorador,\nentão pode entendê-lo.\nÉ bom para você. Informe-se.' },
    { author:'Bertolt Brecht', work:'A Solução (1953)',
      lines:'Não seria mais simples\no governo dissolver o povo\ne eleger outro?' },
    { author:'Pablo Neruda', work:'Canto Geral (1950)',
      lines:'Sou feito da mesma madeira\nque os que constroem e que os que destroem.\nMinha voz é a voz de todos:\nquem não luta por mim luta contra si mesmo.' },
    { author:'Pablo Neruda', work:'Ainda (1969)',
      lines:'Confesso que vivi.\nConfesso que amei.\nConfesso que sofri\ne que ainda assim sorri.' },
    { author:'Pablo Neruda', work:'Ode ao Pão (1954)',
      lines:'Pão, com farinha, água\ne fogo você se levantou.\nDenso, leve, dourado e esponjoso,\nfuiste para dentro de mim e de todos.' },
    { author:'Pablo Neruda', work:'Ode à Tipografia (1956)',
      lines:'A palavra é a mais poderosa das armas.\nMata e ressuscita.\nAbre portas e as fecha.\nÉ o princípio e o fim.' },
    { author:'Ferreira Gullar', work:'Poema Sujo (1976)',
      lines:'Um homem só, numa cidade estranha,\ncompõe, à noite, um pequeno poema.\nEle sabe que amanhã\nnão haverá tempo para poemas.' },
    { author:'Ferreira Gullar', work:'Não Há Vagas (1980)',
      lines:'A vida não vale a pena\nse não se luta por ela.\nE a luta não tem sentido\nse não há vida por ela.' },
    { author:'Ferreira Gullar', work:'Dentro da Noite Veloz (1975)',
      lines:'Minha vida, minhas lutas,\nminha gente,\nmeu Brasil.\nTudo isso sou eu\ntambém.' },
    { author:'Álvaro de Campos (Fernando Pessoa)', work:'Ultimatum (1917)',
      lines:'Mando ao mundo\nde uma só vez todo o seu lixo.\nFica nu, mundo, fica nu—\na tua verdade é o que não tens.' },
    { author:'Carlos Drummond de Andrade', work:'Rosa do Povo (1945)',
      lines:'Lutar com palavras\né a luta mais vã.\nEntanto lutamos\nmal rompe a manhã.' },
    { author:'Carlos Drummond de Andrade', work:'Elegia 1938 (1940)',
      lines:'Trabalhas sem alegria para um mundo caduco,\nonde a forma e a matéria\nsão as únicas aspirações do tipo humano.' },
    { author:'Carlos Drummond de Andrade', work:'Nosso Tempo (1945)',
      lines:'Este é tempo de partido,\ntempo de homens partidos.\nEm vão me sorris, natureza.\nTuas forças não me auxiliam.' },
    { author:'Maiakóvski', work:'Nuvem de Calças (1915)',
      lines:'Glorifico-me no presente!\nO passado é apertado demais.\nO amanhã ainda não existe.\nSó existe o agora, imenso e veloz.' },
    { author:'Maiakóvski', work:'A Plenos Pulmões (1930)',
      lines:'Quero que minha pátria me compreenda,\nmas se não me compreender,\npassarei por minha pátria amada\nde lado, como passa a chuva oblíqua.' },
    { author:'Solano Trindade', work:'Cantares ao Meu Povo (1961)',
      lines:'Tenho sangue africano nas veias.\nNão me envergonho.\nSou negro.\nSou filho de escravos.\nMas carrego no peito a liberdade.' },
    { author:'Conceição Evaristo', work:'Poemas de recordação (2008)',
      lines:'A minha voz ainda\neco ressoa\nquebrando pedras\ncortando longas distâncias.' },
    { author:'Conceição Evaristo', work:'Olhos D\'água (2014)',
      lines:'Escrever pode ser uma espécie de luta\ncontra o esquecimento,\numa tentativa de suprir ausências,\nde recuperar presenças.' },
    { author:'García Lorca', work:'Romanceiro Gitano (1928)',
      lines:'Verde que te quiero verde.\nVerde viento. Verdes ramas.\nEl barco sobre la mar\ny el caballo en la montaña.' },
    { author:'García Lorca', work:'Chanto por Ignacio Sánchez Mejías (1935)',
      lines:'Às cinco da tarde.\nEram as cinco em ponto da tarde.\nUm garoto trouxe o lençol branco\nàs cinco da tarde.' },
    { author:'Murilo Mendes', work:'Poemas (1930)',
      lines:'A morte não é a última palavra.\nA última palavra é a vida\nque recomeça em todo lugar\nonde o homem se levanta.' },
    { author:'Mário de Andrade', work:'Losango Cáqui (1926)',
      lines:'Sou trezentos, sou trezentos-e-cinquenta,\nmas um dia afinal\nterei encontrado a mim mesmo.' },
    { author:'José Martí', work:'Versos Simples (1891)',
      lines:'Cultivo uma rosa branca\nem julho como em janeiro,\npara o amigo sincero\nque me dá a mão franca.' },
    { author:'Paul Éluard', work:'Liberdade (1942)',
      lines:'Nas minhas cadernos de estudante\nnas minhas carteiras e nas árvores\nescrevo o teu nome.\nLiberdade.' },
    { author:'Thiago de Mello', work:'Estatuto do Homem (1964)',
      lines:'Fica decretado que agora vale a verdade.\nAgora vale a vida e que de mãos dadas\ncaminhemos todos pela vida verdadeira.' },
    { author:'Patativa do Assaré', work:'Cante lá que eu canto cá (1978)',
      lines:'Sou filho da seca, sou filho do sol,\nnasci entre o espinho e a pedra,\nmas carrego dentro do peito\numa primavera inteira.' },
    { author:'Affonso Romano de Sant\'Anna', work:'Que País é Este (1980)',
      lines:'Que país é este\nonde tudo se explica\ne nada se resolve?\nQue povo é este\nque tudo suporta\ne nada transforma?' },
    { author:'Glauber Rocha', work:'Manifesto Estética da Fome (1965)',
      lines:'Onde há fome\nhá revolução.\nOnde há revolução\nhá arte.\nOnde há arte\nhá esperança.' },
    { author:'Drummond de Andrade', work:'A um Hotel em Demolição (1968)',
      lines:'Está demolido o hotel\nmas o quarto existe ainda\ne dentro do quarto estamos\nnós, que nunca saímos.' },
    { author:'Torquato Neto', work:'Cogito (1972)',
      lines:'Eu sou como eu sou.\nPronome pessoal intransferível.\nDo tamanho do que sou,\nnão do tamanho do meu nome.' },
    { author:'Caetano Veloso', work:'Letra só (2003)',
      lines:'Um país inteiro\na se desconstruir\ne a reconstruir\na cada amanhecer.' },
    { author:'Chico Buarque', work:'Cálice (1973)',
      lines:'Pai, afasta de mim esse cálice\nde vinho tinto de sangue.\nPai, afasta de mim esse cálice\nde vinho tinto de sangue.' },
  ],

  existencia: [
    { author:'Rainer Maria Rilke', work:'Elegias de Duíno (1923)',
      lines:'Quem, se eu gritasse, me ouviria\nno meio dos anjos?\nE se, de súbito, um deles me apertasse\nao coração: eu morreria de sua existência mais forte.' },
    { author:'Rainer Maria Rilke', work:'O Livro das Imagens (1902)',
      lines:'Tenho medos. Tenho medos.\nMas devo partir.\nDevo partir sem saber\npara onde vou existir.' },
    { author:'Rainer Maria Rilke', work:'Cartas a um Jovem Poeta (1929)',
      lines:'Tenha paciência com tudo que está irresoluto\nem seu coração e tente amar as próprias questões.\nNão procure as respostas agora.\nElas só poderão ser dadas quando você as viver.' },
    { author:'Rainer Maria Rilke', work:'Sonetos a Orfeu (1922)',
      lines:'Canta-me, ó Musa, a vida como ela é:\nnão como sonhamos que poderia ser.\nCanta a vida que arde e que perece,\ne que na perda a si mesma revive.' },
    { author:'Carlos Drummond de Andrade', work:'A Rosa do Povo (1945)',
      lines:'No meio do caminho tinha uma pedra\ntinha uma pedra no meio do caminho\ntinha uma pedra\nno meio do caminho tinha uma pedra.\nNunca me esquecerei desse acontecimento\nna vida de minhas retinas tão fatigadas.' },
    { author:'Carlos Drummond de Andrade', work:'Sentimento do Mundo (1940)',
      lines:'Tenho apenas duas mãos\ne o sentimento do mundo.\nTenho apenas duas mãos\ne o mundo pesa demais.' },
    { author:'Carlos Drummond de Andrade', work:'A Máquina do Mundo (1951)',
      lines:'E como eu palmilhasse vagamente\numa estrada de Minas, pedregosa,\ne no fecho da tarde um sino rouco\nse misturasse ao zumbido da abelha.' },
    { author:'Carlos Drummond de Andrade', work:'Resíduo (1945)',
      lines:'De tudo ficou um pouco.\nDo meu medo. Do teu asco.\nDos gritos gagos. Da rosa\nficou um pouco.' },
    { author:'Emily Dickinson', work:'Poema 712 (ed. póstuma, 1890)',
      lines:'Porque não pude deter-me para a Morte—\nela gentilmente parou por mim—\na carruagem continha apenas nós dois\ne a Imortalidade.' },
    { author:'Emily Dickinson', work:'Poema 254 (ed. póstuma, 1890)',
      lines:'Esperança é a coisa com penas\nque pousa na alma\ne canta a melodia sem as palavras\ne nunca para — jamais.' },
    { author:'Emily Dickinson', work:'Poema 341 (ed. póstuma, 1890)',
      lines:'Depois de grande dor vem um sentimento formal —\nos Nervos ficam sentados cerimoniais, como Túmulos —\nO Pé rígido pergunta "E agora?"' },
    { author:'Emily Dickinson', work:'Poema 435 (ed. póstuma, 1890)',
      lines:'A dor tem um elemento vazio;\nnão se lembra quando começou,\nnem se havia um tempo em que não havia.\nCome tudo ao seu redor.' },
    { author:'Fernando Pessoa (ele mesmo)', work:'Mensagem (1934)',
      lines:'Não sou nada.\nNunca serei nada.\nNão posso querer ser nada.\nÀ parte isso, tenho em mim todos os sonhos do mundo.' },
    { author:'Fernando Pessoa (Bernardo Soares)', work:'Livro do Desassossego (póstumo, 1982)',
      lines:'Não sou pessimista. Sou triste.\nNão descrevo o que existe: sonho o que poderia ser.\nNão há realidade que minha imaginação não mude.' },
    { author:'Fernando Pessoa (Alberto Caeiro)', work:'O Guardador de Rebanhos (1914)',
      lines:'Pensar incomoda como andar à chuva\nquando o vento cresce e parece que chove\nmais do que chove.' },
    { author:'Fernando Pessoa (Alberto Caeiro)', work:'O Guardador de Rebanhos — II (1914)',
      lines:'O meu olhar é nítido como um girassol.\nTenho o costume de andar pelas estradas\nolhando para a direita e para a esquerda,\ne de vez em quando olhando para trás…' },
    { author:'Fernando Pessoa (Ricardo Reis)', work:'Odes (1914-1935)',
      lines:'Cada um cumpre o destino que lhe cumpre\ne deseja o destino que deseja;\nnão há quem fuja ao próprio pensamento\nem toda a amplidão da natureza.' },
    { author:'Albert Camus', work:'O Mito de Sísifo (1942)',
      lines:'É preciso imaginar Sísifo feliz.\nA luta por si só basta para encher\no coração de um homem.\nO absurdo e a felicidade coexistem.' },
    { author:'Jorge Luis Borges', work:'O Outro, O Mesmo (1964)',
      lines:'O tempo me aterroriza mais do que a morte,\npois o tempo é mais irreal.\nMinha morte,\nse é que voltarei a morrer, me importa pouco.' },
    { author:'Jorge Luis Borges', work:'Elogio da Sombra (1969)',
      lines:'Fui, mas não estava.\nEstava, mas não era.\nSou o que fui e o que serei:\no espelho que reflete mas não se repete.' },
    { author:'Jorge Luis Borges', work:'Arte Poética (1960)',
      lines:'Olhar o rio feito de tempo e água\ne recordar que o tempo é outro rio,\nsaber que nos perdemos como o rio\ne que os rostos passam como a água.' },
    { author:'Paul Celan', work:'Fuga da Morte (1948)',
      lines:'Leite negro da aurora nós o bebemos à tarde\nnós o bebemos ao meio-dia e de manhã nós o bebemos à noite\nnós bebemos e bebemos.' },
    { author:'Clarice Lispector', work:'A Paixão Segundo G.H. (1964)',
      lines:'Eu queria o contato com a vida.\nMas eu não sabia que a vida era tão dura,\ntão crua,\ntão indiferente e real.' },
    { author:'Clarice Lispector', work:'Água Viva (1973)',
      lines:'O que me guia é o que me escapa.\nO que me pertence é o que persigo.\nExisto naquilo que não alcancei ainda,\nno que ainda não sei que busco.' },
    { author:'Manoel de Barros', work:'Memórias Inventadas (2003)',
      lines:'O que me interessa é o delírio do ser.\nO que me interessa é a fresta\npor onde a luz entra\ne o silêncio se instala.' },
    { author:'Manoel de Barros', work:'Livro das Ignorãças (1993)',
      lines:'O que a palavra não consegue,\na imagem consegue.\nO que a imagem não consegue,\no silêncio resolve.' },
    { author:'Manoel de Barros', work:'Tratado Geral das Grandezas do Ínfimo (2001)',
      lines:'Aprendi com meu filho de dez anos\nque a poesia está na palavra que falta.\nA palavra que falta\né sempre a mais necessária.' },
    { author:'Sophia de Mello Breyner', work:'Dual (1972)',
      lines:'Procuro encontrar no mundo a face\ndo que não tem imagem nem nome.\nProcuro o que recusa todo o traço\ne que nenhum espelho em si consome.' },
    { author:'João Cabral de Melo Neto', work:'A Educação pela Pedra (1966)',
      lines:'A pedra não tem tempo.\nA pedra não tem medo.\nA pedra não tem voz.\nMas pesa sobre o vazio.' },
    { author:'Adélia Prado', work:'O Pelicano (1987)',
      lines:'Deus me deu uma vida esplêndida para consertar.\nDeus me deu feridas para costurar.\nDeus me deu um caminho para percorrer.\nDeus me deu este corpo para habitar.' },
    { author:'Guimarães Rosa', work:'Grande Sertão: Veredas (1956)',
      lines:'O sertão é do tamanho do mundo.\nO sertão é dentro da gente.\nViver é muito perigoso.\nTraversia.' },
    { author:'Hilda Hilst', work:'Da Morte (1980)',
      lines:'Morte, quando eu morrer\nquero que me enterres\ncom os meus versos dentro.\nPara me acompanhar.' },
    { author:'Hilda Hilst', work:'Poesia (1959-1979)',
      lines:'Sou o que busca\ne o que nunca encontra.\nSou a pergunta\ne o silêncio da resposta.' },
    { author:'Drummond de Andrade', work:'Procura da Poesia (1945)',
      lines:'Não faças versos sobre acontecimentos.\nNão há criação nem morte perante a poesia.\nDiante dela, a vida é um sol estático,\nnão aquece nem ilumina.' },
    { author:'Wislawa Szymborska', work:'Vista com Grão de Areia (1986)',
      lines:'Admiro-me\ndo que é o suficiente para acontecer:\ncair a neve,\nflorir uma flor.' },
    { author:'Wislawa Szymborska', work:'Nada Duas Vezes (1957)',
      lines:'Nada pode acontecer duas vezes.\nNessa razão nascemos sem experiência\ne morremos sem rotina.' },
    { author:'Octávio Paz', work:'Pedra de Sol (1957)',
      lines:'Um salgueiro de cristal, um choupo de água,\num alto jato curvado pelo vento,\numa árvore enraizada, mas dançante,\num caminho de rio que se dobra.' },
    { author:'Pablo Neruda', work:'O Mar (1954)',
      lines:'Preciso do mar porque me ensina:\nnão sei se aprendo música ou consciência,\nnão sei se é onda ou ser profundo\nou só voz rouca ou brilhante a essência.' },
  ],
};

/* ── Títulos — 40 por tema (sem repetição via controle de estado) ── */
const TITULOS = {
  romance: [
    'Os Laços Invisíveis','Amor em Carne Viva','Cartas ao Mar','O Incêndio Quieto',
    'Ferida Doce','O Que Ficou do Verão','Entre Teus Braços e o Nada','A Última Carta',
    'Saudade sem Nome','O Amor que Não Se Diz','Pele como Poema','Chuva Dentro de Mim',
    'Desejos à Meia-Noite','O Teu Silêncio Me Basta','Sempre Foste o Mar',
    'O Que o Fogo Guarda','Palavras que Não Enviei','A Cor dos Teus Olhos',
    'Enquanto Durares','Noite de Nós Dois','Do Outro Lado do Espelho',
    'O Retorno da Maré','Promessas Feitas no Escuro','Tudo que Não Dissemos',
    'A Forma do Teu Nome','Quando Me Olhavas','O Amor e a Ausência',
    'Raízes do Desejo','Antes de Partir','O Breve Que Foi Muito',
    'Tarde Demais, Cedo Demais','O Sonho Que Habitas','Distância Interior',
    'A Última Vez que te Vi','Amor como Naufrágio','O Mundo Que Inventamos',
    'Verso e Corpo','Constelação de Dois','A Hora Azul','Tecido de Saudade',
  ],
  politico: [
    'Trincheiras de Papel','O Grito que Persiste','Voz sem Dono','Resistência',
    'Manifesto dos Esquecidos','As Pedras Também Sangram','O Povo Não Dorme',
    'Palavras que Ardem','Carta às Gerações Futuras','A Luta Continua',
    'Nós Que Aqui Estamos','Contra o Esquecimento','Quando o Silêncio Fala',
    'O Amanhã que Plantamos','Herança de Luta','O Nome dos Que Ficaram',
    'Mapa das Injustiças','Fome de Justiça','A Revolta dos Mansos',
    'O Que os Rios Guardam','Tempo de Reconstruir','Vozes do Subsolo',
    'O Chão que Pisamos','Antes que o Dia Acabe','Quem Faz a História',
    'Os Invisíveis','Anatomia de um País','Carta Aberta ao Futuro',
    'A Voz dos Sem Voz','Memória e Resistência','Do Silêncio à Fala',
    'Um Novo Amanhecer','A Longa Marcha','Os que Partiram Antes',
    'Sementes no Asfalto','A Força do Fraco','Palavra de Ordem',
    'O Povo É o Poeta','Nas Ruas do Mundo','Democracia Inacabada',
  ],
  existencia: [
    'O Peso do Ser','Abismo Interior','Entre o Nada e Tudo','Silêncio Profundo',
    'A Pedra no Caminho','O Que Sou Quando Sonho','Mapas do Desconhecido',
    'Espelho sem Reflexo','A Hora Que Não Volta','Labirinto de Mim',
    'O Tempo que Me Habita','Às Margens do Real','Contemplação do Vazio',
    'O Que Resta','Ecos do Inominável','O Instante e o Eterno',
    'Travessia do Escuro','A Pergunta que Não Tem Nome','Dentro do Próprio Silêncio',
    'O Mundo Que Imagino','Fronteiras do Eu','A Vida que Não Vivi',
    'Entre Ser e Não Ser','O Que Me Faz Humano','Vertigem Existencial',
    'Dissolução','A Matéria do Sonho','Quando o Tempo Para',
    'Vazio Habitado','A Dor Sem Forma','O Desconhecido Interior',
    'Exílio de Si Mesmo','O Mistério de Existir','Além da Sombra',
    'O Que Persiste','Ruínas do Eu','A Última Fronteira',
    'Encontro com o Nada','Tessituras do Ser','O Fim e o Princípio',
  ],
};

const NOMES_TEMA = { romance:'Romance', politico:'Político', existencia:'Existência' };

/* ── Embaralha array in-place (Fisher-Yates) ── */
function embaralhar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

/* ── Estado ── */
let usuario    = null;
let livros     = JSON.parse(localStorage.getItem('ogrito_livros') || '[]');
let livroAtual = null;
let pgAtual    = 'main';
let coverIdx   = livros.length % COVERS.length;

/* Filas embaralhadas de títulos — garantem não repetição */
const filaTitulos = { romance: [], politico: [], existencia: [] };

function proximoTitulo(tema) {
  if (filaTitulos[tema].length === 0) {
    // reabastece e embaralha quando a fila esvazia
    filaTitulos[tema] = embaralhar(TITULOS[tema].slice());
  }
  return filaTitulos[tema].pop();
}

/* Fila de estrofes por tema — garante máxima diversidade antes de reciclar */
const filaEstrofes = { romance: [], politico: [], existencia: [] };

function sortear4(tema) {
  // Se a fila tiver menos de 4, reabastece com pool embaralhado
  if (filaEstrofes[tema].length < 4) {
    filaEstrofes[tema] = embaralhar(POOL[tema].slice());
  }
  return filaEstrofes[tema].splice(0, 4);
}

/* ── Sessão ── */
function salvarSessao(u) {
  if (u) localStorage.setItem('ogrito_user', JSON.stringify(u));
  else   localStorage.removeItem('ogrito_user');
}
function restaurarSessao() {
  try { const s = localStorage.getItem('ogrito_user'); if (s) usuario = JSON.parse(s); } catch(e) {}
}

/* ── Navegação SPA ── */
function ir(pg) {
  const old = document.getElementById('pg-' + pgAtual);
  if (old) old.classList.remove('active');
  pgAtual = pg;
  const novo = document.getElementById('pg-' + pg);
  if (novo) { novo.classList.add('active'); window.scrollTo(0,0); }
  if (pg === 'biblioteca') renderBiblioteca();
}
window.ir = ir;

/* ── Auth ── */
window.fazerLogin = function() {
  usuario = { name:'Leitor Anônimo', avatar:'https://ui-avatars.com/api/?name=Leitor&background=3d5e3a&color=e8dcc8&size=80' };
  salvarSessao(usuario); atualizarUI(); toast('Bem-vindo, ' + usuario.name + '!');
};
window.fazerLogout = function() {
  usuario = null; salvarSessao(null); atualizarUI(); ir('main'); toast('Até logo!');
};
function atualizarUI() {
  const lb  = document.getElementById('google-login-btn');
  const ui  = document.getElementById('user-info');
  const lib = document.getElementById('library-nav-btn');
  if (!lb) return;
  if (usuario) {
    lb.style.display='none'; ui.style.display='flex'; lib.style.display='block';
    document.getElementById('user-avatar').src       = usuario.avatar;
    document.getElementById('user-name').textContent = usuario.name;
  } else {
    lb.style.display='flex'; ui.style.display='none'; lib.style.display='none';
  }
}

/* ── Modal ── */
window.abrirModalTema  = function() { if (!usuario){toast('Faça login para gerar livros!');return;} document.getElementById('modal-tema').classList.add('active'); };
window.fecharModalTema = function() { document.getElementById('modal-tema').classList.remove('active'); };

/* ── Geração ── */
window.gerarLivro = function(tema) {
  const userSalvo = usuario;
  fecharModalTema();
  document.getElementById('loading-overlay').classList.add('active');

  setTimeout(function() {
    if (!usuario && userSalvo) { usuario = userSalvo; salvarSessao(usuario); atualizarUI(); }

    const capa     = COVERS[coverIdx % COVERS.length];
    coverIdx       = (coverIdx + 1) % COVERS.length;
    const titulo   = proximoTitulo(tema);   // sem repetição
    const estrofes = sortear4(tema);        // 4 únicas do pool

    livroAtual = {
      id:       Date.now(),
      titulo:   titulo,
      tema:     tema,
      capa:     capa.file,
      capaNome: capa.name,
      data:     new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'}),
      estrofes: estrofes,
    };

    livros.push(livroAtual);
    localStorage.setItem('ogrito_livros', JSON.stringify(livros));
    document.getElementById('loading-overlay').classList.remove('active');
    renderSobre(livroAtual);
    ir('sobre');
    toast('Livro "' + titulo + '" gerado!');
  }, 1800);
};

/* ── Sobre o Livro ── */
function renderSobre(livro) {
  const est = livro.estrofes.map(function(s) {
    return '<div class="poem-stanza">' +
      '<div class="stanza-author-tag">' +
        '<span class="stanza-author-name">' + s.author + '</span>' +
        '<span class="stanza-part-name">' + s.work + '</span>' +
      '</div>' +
      '<div class="stanza-text">' + s.lines + '</div>' +
    '</div><div class="stanza-divider">· · ·</div>';
  }).join('');

  const bib = livro.estrofes.map(function(s) {
    return '<div class="bib-entry">' +
      '<span class="bib-author">' + s.author + '</span>' +
      '<span class="bib-work">' + s.work + '</span>' +
    
      '</div>';
  }).join('');

  document.getElementById('sobre-conteudo').innerHTML =
    '<div class="book-header">' +
      '<img class="book-cover-large" src="' + livro.capa + '" alt="' + livro.titulo + '"' +
      ' onerror="this.src=\'https://placehold.co/300x400/1a2e1a/7aad6e?text=Capa\'"/>' +
      '<div class="book-meta">' +
        '<h1>' + livro.titulo + '</h1>' +
        '<div class="theme-tag">✦ ' + NOMES_TEMA[livro.tema] + '</div>' +
        '<div class="cover-credit">' + livro.capaNome + '</div>' +
        '<div class="book-date">Gerado em ' + livro.data + '</div>' +
        '<div class="action-btns">' +
          '<button class="action-btn primary" onclick="abrirPoema()">📖 Ler Poema</button>' +
          '<button class="action-btn" onclick="gerarPDF()">⬇ Baixar PDF</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="poem-inline-section">' +
      '<div class="poem-section-title">' + livro.titulo + '</div>' +
      est +
    '</div>' +
    '<div class="bibliography-section">' +
      '<h3>Referências Bibliográficas</h3>' +
      '<p class="bib-intro">Autores e obras que compõem este livro:</p>' +
      bib +
    '</div>';
}

/* ── Poema limpo ── */
window.abrirPoema = function() {
  if (!livroAtual) return;
  const livro = livroAtual;


  document.getElementById('poema-titulo-topo').textContent = livro.titulo;

  const wrap = document.getElementById('poema-wrap');

  wrap.innerHTML = '';

  const cab = document.createElement('div'); cab.className='poema-cabecalho';
  const h1  = document.createElement('h1');  h1.className='poema-titulo';   h1.textContent=livro.titulo;
  const tag = document.createElement('div'); tag.className='poema-tag';    tag.textContent='✦ '+NOMES_TEMA[livro.tema];
  const dat = document.createElement('span');dat.className='poema-data';   dat.textContent=livro.data;
  cab.appendChild(h1); cab.appendChild(tag); cab.appendChild(dat);
  wrap.appendChild(cab);

  const orn=document.createElement('div'); orn.className='poema-ornamento'; orn.textContent='— ✦ —';
  wrap.appendChild(orn);

  livro.estrofes.forEach(function(s,i){
    const p=document.createElement('p'); p.className='poema-estrofe'; p.textContent=s.lines;
    wrap.appendChild(p);
    if (i < livro.estrofes.length-1) {
      const d=document.createElement('div'); d.className='poema-divisor'; d.textContent='· · ·';
      wrap.appendChild(d);
    }
  });

  const rod=document.createElement('div'); rod.className='poema-rodape';
  rod.innerHTML='<p>Uma Antologia Viva</p>';
  wrap.appendChild(rod);

  ir('poema');
};

/* ── Biblioteca ── */
function renderBiblioteca() {
  const grid=document.getElementById('books-grid'); if(!grid) return;
  if (livros.length===0) {
    grid.innerHTML='<div class="empty-library">Nenhum livro gerado ainda.<br>Clique em "✦ Gerar Livro" para começar.</div>';
    return;
  }
  grid.innerHTML=livros.map(function(b){
    return '<div class="book-card" onclick="abrirDaBiblioteca('+b.id+')">' +
      '<img class="book-cover" src="'+b.capa+'" alt="'+b.titulo+'"' +
      ' onerror="this.src=\'https://placehold.co/300x400/1a2e1a/7aad6e?text=Capa\'"/>' +
      '<div class="book-info">' +
        '<div class="book-card-title">'+b.titulo+'</div>' +
        '<div class="book-card-theme">'+NOMES_TEMA[b.tema]+'</div>' +
        '<div class="book-card-date">'+b.data+'</div>' +
      '</div></div>';
  }).join('');
}

window.abrirDaBiblioteca = function(id) {
  const livro=livros.find(function(b){return b.id===id;});
  if (!livro) return;
  livroAtual=livro; renderSobre(livro); ir('sobre');
};

/* ── PDF ── */
window.gerarPDF = function() {
  if (!livroAtual) return;
  const b=livroAtual, tema=NOMES_TEMA[b.tema]||b.tema;
  let pLines='';
  b.estrofes.forEach(function(s,i){
    const pre=document.createElement('pre'); pre.textContent=s.lines;
    const sep=i<b.estrofes.length-1?'<p style="text-align:center;color:#b0c8a8;letter-spacing:.44em;margin:14px 0;">· · ·</p>':'';
    pLines+='<pre style="font-family:\'IM Fell English\',Georgia,serif;font-size:1.04rem;line-height:2.05;font-style:italic;white-space:pre-wrap;margin-bottom:18px;background:none;border:none;padding:0;">'+pre.innerHTML+'</pre>'+sep;
  });
  let pBib='';
  b.estrofes.forEach(function(s){
    const a=document.createElement('span');a.textContent=s.author;
    const w=document.createElement('span');w.textContent=s.work;
    pBib+='<div style="margin-bottom:10px;"><strong>'+a.innerHTML+'</strong><br><em style="color:#555;font-size:.79rem;">'+w.innerHTML+'</em></div>';
  });
  const tE=document.createElement('span');tE.textContent=b.titulo;
  const dE=document.createElement('span');dE.textContent=b.data;
  const cE=document.createElement('span');cE.textContent=b.capaNome;

  const html='<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">' +
    '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=IM+Fell+English:ital@1&family=Cormorant+Garamond:wght@400&display=swap" rel="stylesheet"/>' +
    '<style>body{font-family:"Cormorant Garamond",Georgia,serif;background:#faf7f0;color:#1a1a1a;max-width:640px;margin:0 auto;padding:58px 62px 80px;}' +
    'h1{font-family:"Playfair Display",serif;font-size:2.4rem;font-weight:900;color:#162016;line-height:1.13;margin-bottom:10px;}' +
    '.tag{display:inline-block;border:1px solid #3a5a38;color:#3a5a38;padding:3px 13px;font-size:.72rem;font-style:italic;letter-spacing:.13em;margin-bottom:6px;}' +
    '.meta{font-size:.73rem;color:#aaa;font-style:italic;margin-bottom:44px;padding-bottom:14px;border-bottom:1px solid #ddd;}' +
    '.orn{text-align:center;color:#b0c8a8;letter-spacing:.55em;margin-bottom:36px;}' +
    '.bw{margin-top:48px;padding-top:18px;border-top:1px solid #ddd;}' +
    '.bh{font-family:"Playfair Display",serif;font-size:.73rem;letter-spacing:.18em;text-transform:uppercase;color:#888;margin-bottom:13px;}' +
    '.ft{margin-top:42px;text-align:center;font-size:.67rem;color:#ccc;font-style:italic;}' +
    '@media print{body{padding:32px 46px;}@page{margin:1.8cm;}}</style></head><body>' +
    '<h1>'+tE.innerHTML+'</h1><span class="tag">✦ '+tema+'</span>' +
    '<p class="meta">Gerado em '+dE.innerHTML+' · O Grito das Palavras · '+cE.innerHTML+'</p>' +
    '<p class="orn">— ✦ —</p>'+pLines +
    '<div class="bw"><p class="bh">Referências Bibliográficas</p>'+pBib+'</div>' +
    '<p class="ft">O Grito das Palavras — Uma Antologia Viva</p>' +
    '<scr'+'ipt>window.onload=function(){window.print();setTimeout(window.close,1500)};</scr'+'ipt>' +
    '</body></html>';

  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const w=window.open(url,'_blank');
  toast(w?'Janela aberta — escolha "Salvar como PDF".':'Permita pop-ups e tente novamente.');
  setTimeout(function(){URL.revokeObjectURL(url);},15000);
};

/* ── Toast ── */
function toast(msg){
  const t=document.getElementById('toast'); if(!t) return;
  t.textContent=msg; t.classList.add('show');
  setTimeout(function(){t.classList.remove('show');},3400);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded',function(){
  restaurarSessao(); atualizarUI();
  document.getElementById('modal-tema').addEventListener('click',function(e){if(e.target===this)fecharModalTema();});
});
