"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";import { useEffect, useRef, useState } from "react";

/**
 * Carousel de Fichas — 6 apresentações com setas laterais
 *
 * Como usar:
 * - Preencha o array `characters` com as outras 5 fichas.
 * - Use as setas na tela, setas do teclado (←/→) ou gesto de arrastar para navegar.
 * - Design escuro, pronto pra print/share.
 */

// Tipagem leve para cada ficha
interface CharacterCardData {
name: string;
subtitle?: string; // ex: Filha da Lua
role?: string; // ex: Ocultista
quote?: string;
abilityTitle?: string; // ex: Dança Lunar
abilityIntro?: string; // primeira linha explicativa
abilityBullets?: string[]; // lista de mecânicas
traits?: { label: string; text: string }[]; // ex: À noite/De dia
hasHidden?: boolean; // se true, começa oculto e alterna com o “olho”
bgUrl?: string; // imagem de fundo específica
}[]; // ex: À noite/De dia




// *** PREENCHA AQUI AS 6 FICHAS ***
const characters: CharacterCardData[] = [
  {
    name: "Luna Yassino",
    bgUrl: "https://i.redd.it/99q6lr75n1f81.png",
    subtitle: "A Filha da Lua",
    role: "Ocultista",
    quote: "“A lua me guia ou me prende...? não cabe a mim decidir.”",
    abilityTitle: "Dança Lunar",
    abilityIntro:
      "Teletransporte ao luar (2 PD): Luna pode se teletransportar para um ponto visível, banhado pela luz da lua, até 18 metros.",
    abilityBullets: [
      "Em combate: conta como Ação de Movimento.",
      "Alternativa (Reação): gastando 4 PD, recebe +10 de Esquiva contra um ataque e move-se apenas 1,5 m em direção à fonte de luz alvo.",
      "Requisito: o ponto/fonte deve estar visível e banhado pelo luar.",
      "Passiva: pode conjurar rituais enquanto se move com a Dança Lunar; rituais têm efeitos extras quando conjurados sob a luz da lua.",
    ],
    traits: [
      { label: "Medrosa", text: "" },
      { label: "Obstinada", text: "" },
      { label: "Leal", text: "" },
    ],
  },
  {
    name: "Shizuru Kiyotaka",
    bgUrl:"https://i.redd.it/e8sb6tvt3bo81.jpg",
    subtitle: "O Silêncio Eterno",
    role: "Especialista",
    quote:
      "“Uma lâmina afiada traz ao fim a beleza da mais linda flor — e encurta a mais longínqua vida.”",
    abilityTitle: "Passos Leves",
    abilityIntro:
      "Gastando 2 PD, Shizuru recebe +5 em Furtividade em todos os testes.",
    abilityBullets: [
      "Enquanto furtiva: ataques causam +1 dado de dano (mesmo tipo da arma) e têm +2 na margem de ameaça.",
      "Após realizar 1 ataque, pode gastar +2 PD para emergir nas sombras e fazer um último teste de Furtividade sem a penalidade por ter atacado (podendo permitir 2 ataques furtivos na mesma rodada).",
      "Passiva — Especialista em Assassinatos: pode realizar ataques furtivos à distância com armas de arremesso; se um ataque furtivo reduzir o alvo a 50% dos PV máximos ou menos, o alvo é eliminado imediatamente.",
    ],
    traits: [
      { label: "Centrada", text: "" },
      { label: "Estrategista", text: "" },
      { label: "Literal", text: "" },
    ],
  },
  {
    name: "Raziel (Raz) Navi",
    bgUrl:"https://images.steamusercontent.com/ugc/1777212087670324368/CA84B62186D77032A7CE46E540BFC694828B53C6/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    subtitle: "O Inexistente.",
    role: "Combatente",
    quote:
      "“Não importa quantas lutas eu vença — só vão lembrar de mim no dia em que eu cair.”",
    abilityTitle: "Punhos Divergentes",
    abilityIntro:
      "Gastando 2 PD, Raz manifesta o saber nas faixas: até o fim do turno, seus ataques recebem +1 dado de dano (mesmo tipo) e +1 no multiplicador de dano.",
    abilityBullets: [
      "Em acerto crítico, pode gastar +2 PD para realizar 1 ataque extra contra um inimigo diferente a até 6 m.",
      "Esse segundo ataque também pode aplicar Punhos Divergentes se for crítico, permitindo reutilizar a habilidade no mesmo turno.",
    ],
    traits: [
      { label: "Gentil", text: "" },
      { label: "Companheiro", text: "" },
      { label: "Calmo", text: "" },
    ],
  },
  {
    name: "Leandro \"Lito\" Fernandes",
    bgUrl: "https://i.redd.it/3obtedof2jsd1.jpeg",
    subtitle: "O Dançarino",
    role: "Combatente",
    quote:
      "“Nesse circo de sangue, achar graça é só o jeito que encontrei de não afundar. Errado seria mentir.”",
    abilityTitle: "Pé Pesado",
    abilityIntro: "Ao acertar um crítico, Lito pode gastar 4 PD para aplicar um efeito:",
    abilityBullets: [
      "Nocauteante: o alvo fica Atordoado por 1 rodada.",
      "Meia-lua de Compasso: aplica o mesmo dano a todos os inimigos adjacentes ao alvo (não acumula com Coreografia de Luta).",
      "Golpe Baixo: o alvo fica Imóvel por 1 rodada e Lento até o fim da cena.",
      "Ativação: imediata, no momento do crítico. Alvos imunes a atordoamento/imobilização ignoram o respectivo efeito.",
      "Passiva — Ginga: pode substituir testes de Força por Agilidade em testes físicos; ações de Atletismo podem ser trocadas por Acrobacia, a critério do Mestre.",
    ],
    traits: [
      { label: "Exibido", text: "" },
      { label: "Cínico", text: "" },
      { label: "Explosivo", text: "" },
    ],
  },
  {
    name: "Elora",
    bgUrl: "https://cdn-images.dzcdn.net/images/cover/6ddcdd08ed52b2450eb9e20b40d5ae51/1900x1900-000000-80-0-0.jpg",
    subtitle: "A Desgarrada",
    role: "Ocultista",
    quote:
      "“Falou alguma coisa? Perdão. É que o Sr.crânio tá no capítulo em que ele… bom… vira um crânio.”",
    abilityTitle: "Biluteteia",
    abilityIntro:
      "Conjuração acelerada ou caótica, ao custo de PD ou Sanidade.",
    abilityBullets: [
      "Gastando o dobro de PD do custo do ritual, conjura em 1 turno e ainda aplica todas as vantagens de Conjuração Complexa.",
      "Alternativamente, pode conjurar rituais com 0 PD; a cada ritual assim lançado, sofre 1 Efeito de Medo e recebe +2 cumulativo na rolagem para determinar o próximo Efeito de Medo.",
      "Passiva — Punhal Epifânico: ao executar um alvo com seu punhal, ganha 8 PD temporários e sofre, em sequência, os Efeitos de Medo da tabela do menor para o maior (efeitos entram em acúmulo).",
      "Narrativa — Medo de Elora: adapte criativamente os Efeitos de Medo para manifestações mais psicóticas e perturbadoras, conforme a ficção e a critério do Jogador.",
    ],
    traits: [
      { label: "Explosiva", text: "" },
      { label: "Inteligente", text: "" },
      { label: "Insana(?)", text: "" },
    ],
  },
 {
  name: "Fernando (Lock) Lamine",
  bgUrl: "https://things.3dfila.com.br/img/52779.jpg",
  subtitle: "O Cansado",
  role: "Combatente",
  quote: "“Às vezes, eu só queria um trabalho normal, sabe?”",
  abilityTitle: "Bladelock",
  abilityIntro: "Desfere cadeias de golpes e prende alvos no deadlock.",
  abilityBullets: [
    "Bladelock (4 PD): desfere 2 ataques (no mesmo alvo — cravando as lâminas — ou em alvos diferentes). Se ambos acertarem, pode aplicar 1 Manobra contra os dois alvos; alvos atingidos ficam afetados por Bladelock.",
    "Passiva — Deadlock: contra alvos agarrados, gastando 3 PD, puxa as lâminas (Teste de Atletismo). Em sucesso, aproxima os alvos e realiza 1 ataque com +1 no multiplicador de crítico. Se acertar, todos os inimigos sob Bladelock sofrem o dano de um acerto crítico."
  ],
  traits: [
    { label: "Racional", text: "" },
    { label: "Experiente", text: "" },
    { label: "Direto", text: "" }
  ],
  hasHidden: true
},

];

// Componente de Card reaproveitável
function CharacterCard({ data }: { data: CharacterCardData }) {
   const [hidden, setHidden] = useState(!!data.hasHidden);
  // Reinicia visibilidade quando troca de personagem
  useEffect(() => {
    setHidden(!!data.hasHidden);
  }, [data]);
  const {
    name,
    subtitle,
    role,
    quote,
    abilityTitle,
    abilityIntro,
    hasHidden,
    bgUrl,
    abilityBullets = [],
    traits = [],
  } = data;

  return (
    <Card className="relative w-[720px] max-w-full rounded-2xl shadow-2xl border-slate-800 bg-slate-950/70 backdrop-blur overflow-hidden">
      {/* Plano de fundo por personagem + ornamentos */}
      {bgUrl && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url('${bgUrl}')` }} />
          <div className="absolute inset-0 bg-slate-950/60" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_25%,black,transparent)]">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 size-64 rounded-full bg-gradient-to-b from-indigo-300/20 to-transparent blur-2xl" />
        <div className="absolute bottom-0 right-0 size-72 rounded-full bg-gradient-to-tr from-indigo-500/10 to-cyan-300/0 blur-3xl" />
      </div>

      <CardHeader className="relative z-10 pb-3">
        <div className="flex items-start gap-4">
          <div className="grid gap-1">
  <div className="flex items-center gap-3">
    <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">{hasHidden && hidden ? "???" : name}</CardTitle>
    {hasHidden && (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full border border-slate-800 bg-slate-900/50 hover:bg-slate-800/60"
        onClick={() => setHidden((v) => !v)}
        aria-label={hidden ? "Mostrar informações" : "Ocultar informações"}
        title={hidden ? "Mostrar informações" : "Ocultar informações"}
      >
        {hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </Button>
    )}
  </div>

  {(!hasHidden || !hidden) && (
    <div className="flex flex-wrap items-center gap-2 text-slate-300">
      {subtitle && (
        <Badge className="bg-indigo-600/30 text-indigo-200 border border-indigo-400/30">
          {subtitle}
        </Badge>
      )}
      {role && (
        <Badge  className="border-slate-700 text-slate-300">
          {role}
        </Badge>
      )}
    </div>
  )}
</div>

          <div className="ml-auto flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="h-4 w-4" />
            Ficha de apresentação
          </div>
        </div>
      </CardHeader>

      <Separator className="relative z-10 bg-slate-800" />

      <CardContent className="relative z-10 p-6 grid gap-5">
        {/* Frase Guia */}
        {(!hasHidden || !hidden) && quote && (
          <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-inner">
            <h3 className="mb-2 text-sm font-semibold tracking-wide text-slate-300">Frase guia</h3>
            <p className="text-lg italic leading-snug text-slate-100">{quote}</p>
          </section>
        )}

        {/* Habilidade Característica */}
       {(!hasHidden || !hidden) && (abilityTitle || abilityIntro) && (
          <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-inner">
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-300">
              Habilidade característica — <span className="text-slate-100">{abilityTitle ?? ""}</span>
            </h3>
            <div className="grid gap-2 text-slate-200">
              {abilityIntro && <p>{abilityIntro}</p>}
              {abilityBullets.length > 0 && (
                <ul className="list-disc pl-5 text-slate-300">
                  {abilityBullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* Traços */}
       {(!hasHidden || !hidden) && traits.length > 0 && (
          <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-inner">
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-300">Traços</h3>
            <div className="grid gap-2">
              {traits.map((t, i) => (
                <div className="flex items-center gap-2" key={i}>
                  <Badge className="bg-slate-700/60 text-slate-200 border border-slate-600">{t.label}</Badge>
                  <p className="text-slate-200">{t.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
}

export default function FichasCarousel() {
  const [index, setIndex] = useState(0);
  const len = characters.length;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const go = (delta: number) => setIndex((i) => (i + delta + len) % len);

  // Teclado ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [len]);

  // Swipe simples
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      go(dx > 0 ? -1 : 1);
    }
    touch.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative">
        {/* Botão Esquerda */}
        <Button
          variant="ghost"
          className="absolute -left-14 top-1/2 -translate-y-1/2 size-12 rounded-full border border-slate-800 bg-slate-900/50 hover:bg-slate-800/60"
          onClick={() => go(-1)}
          aria-label="Anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Card Atual */}
        <CharacterCard data={characters[index]} />

        {/* Botão Direita */}
        <Button
          variant="ghost"
          className="absolute -right-14 top-1/2 -translate-y-1/2 size-12 rounded-full border border-slate-800 bg-slate-900/50 hover:bg-slate-800/60"
          onClick={() => go(1)}
          aria-label="Próximo"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Indicadores */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {characters.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-opacity ${
                i === index ? "bg-indigo-400" : "bg-slate-600 opacity-50 hover:opacity-80"
              }`}
              aria-label={`Ir para ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
