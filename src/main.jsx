import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const QUESTION_DATA = [
  {
    title: "王道進行を完成させよう",
    answer: ["C", "G", "Am", "Em", "F"],
    features: ["明るい", "切ない", "王道感"],
    explanation:
      "Cはトニックで、最初に明るく安定した家のような場所を作ります。Gはドミナントで前へ進む力を出し、Amに行くとCと共通音を持ちながらマイナーの切なさへ少し陰ります。EmもCと近い音を持つため急に暗くなりすぎず、最後にFへ進むとサブドミナントの広がりが出ます。安定したCから始まり、Gで動き、AmとEmで切なさを足し、Fで開けるので、明るさと切なさが両立しやすい定番進行です。",
    tuneKey: "twinkle",
  },
  {
    title: "カノン進行を完成させよう",
    answer: ["C", "G", "Am", "Em", "F", "C", "F", "G"],
    features: ["感動的", "王道感", "安定感"],
    explanation:
      "Cから始まり、G、Am、Emへ下がるように進むことで、低音がなめらかに動きます。FからCへ戻る場所で安心感が生まれ、最後のGが次のCへ帰りたくなる力を作ります。トニック、ドミナント、サブドミナントがバランスよく並ぶので、長く聴いても自然で感動的に感じやすい進行です。",
    demoTitle: "カノン",
    reference: "代表例: パッヘルベルのカノン",
    demoPattern: "canon",
  },
  {
    title: "小室進行を完成させよう",
    answer: ["Am", "F", "G", "C"],
    features: ["疾走感", "ドラマチック", "切ない"],
    explanation:
      "Amから始まるので最初に切なさが出ます。Fで景色が広がり、Gで強く前へ進む力が生まれ、Cで明るく着地します。暗い場所から明るい場所へ抜ける流れが短い周期で回るため、疾走感とドラマチックさを作りやすい進行です。",
    tuneKey: "ode",
  },
  {
    title: "丸サ進行を完成させよう",
    answer: ["Fmaj7", "E7", "Am7", "C7"],
    features: ["おしゃれ", "都会的", "浮遊感"],
    explanation:
      "Fmaj7は4音目のEが入ることで、普通のFより柔らかく浮いた響きになります。E7はAmへ強く進みたがるセカンダリードミナントで、都会的な緊張感を作ります。Am7で少し落ち着いたあと、C7が次のFmaj7へ戻る力を作るので、おしゃれな循環感が出ます。",
    reference: "代表例: 丸ノ内サディスティックなど",
    tuneKey: "sakura",
  },
  {
    title: "明るい循環進行を完成させよう",
    answer: ["C", "Am", "F", "G"],
    features: ["明るい", "安定感", "王道感"],
    explanation:
      "Cで安定し、Amで少し切なさを混ぜ、Fで広がり、GでCへ戻る準備をします。トニックから近い代理コードを通って戻るため、初心者にも分かりやすい明るい循環です。",
  },
  {
    title: "50s進行を完成させよう",
    answer: ["C", "Am", "Dm", "G"],
    features: ["明るい", "王道感", "安定感"],
    explanation:
      "CからAmは同じ音を多く持つので自然につながります。Dmはサブドミナント系の準備、GはドミナントとしてCへ帰る力を作ります。古いポップスらしい安心感が出る進行です。",
  },
  {
    title: "切ない下降進行を完成させよう",
    answer: ["Am", "G", "F", "E7"],
    features: ["切ない", "緊張感", "ドラマチック"],
    explanation:
      "AmからG、Fへ下がる低音が切なさを作ります。最後のE7はAmへ戻るための強いドミナントなので、暗いだけでなくドラマチックな緊張感が生まれます。",
  },
  {
    title: "ブルース進行を完成させよう",
    answer: ["C7", "F7", "C7", "G7"],
    features: ["緊張感", "王道感", "不安定"],
    explanation:
      "7thコードは完全に安定しきらない響きを持ちます。C7からF7、C7へ戻り、G7で次のC7へ向かうため、ブルースらしい揺れと粘りが出ます。",
  },
  {
    title: "ジャズのツーファイブワンを完成させよう",
    answer: ["Dm7", "G7", "Cmaj7"],
    features: ["おしゃれ", "安定感", "都会的"],
    explanation:
      "Dm7は準備、G7はCへ解決したい緊張、Cmaj7は落ち着きです。サブドミナント、ドミナント、トニックの役割が短くまとまっていて、ジャズの基本語彙になります。",
  },
  {
    title: "マイナーのツーファイブワンを完成させよう",
    answer: ["Bm7b5", "E7", "Am7"],
    features: ["暗い", "緊張感", "おしゃれ"],
    explanation:
      "Bm7b5は不安定な準備、E7はAmへ進む強いドミナント、Am7は暗さを残した着地です。マイナーキーらしい影とジャズっぽい緊張感が出ます。",
  },
  {
    title: "爽やかなポップ進行を完成させよう",
    answer: ["F", "G", "Em", "Am"],
    features: ["爽やか", "切ない", "王道感"],
    explanation:
      "FからGで明るく上がり、EmからAmで少し陰る流れです。前半の上昇感と後半のマイナー感が合わさり、爽やかだけど少し切ない雰囲気になります。",
  },
  {
    title: "感動バラード進行を完成させよう",
    answer: ["F", "G", "C", "Am"],
    features: ["感動的", "明るい", "安定感"],
    explanation:
      "FとGで期待感を高め、Cでしっかり解決します。最後にAmへ進むことで余韻に少し切なさが混ざり、バラードらしい感動が作りやすくなります。",
  },
  {
    title: "明るい締め進行を完成させよう",
    answer: ["F", "G", "C"],
    features: ["明るい", "安定感", "王道感"],
    explanation:
      "Fは広がり、GはCへ戻る力、Cは安定です。サブドミナントからドミナント、トニックへ向かうため、終わった感じが分かりやすく出ます。",
  },
  {
    title: "暗いロック進行を完成させよう",
    answer: ["Am", "G", "F", "G"],
    features: ["暗い", "疾走感", "切ない"],
    explanation:
      "AmからG、Fへ下がることで暗さが出ますが、最後にGへ戻るので止まらず次へ進む力が残ります。ロックやアニメ系にも合いやすい流れです。",
  },
  {
    title: "浮遊感のある進行を完成させよう",
    answer: ["Cmaj7", "Fmaj7", "Em7", "Am7"],
    features: ["浮遊感", "おしゃれ", "穏やか"],
    explanation:
      "maj7やm7は3和音より響きが柔らかく、はっきりしすぎない余白があります。Cmaj7からFmaj7で広がり、Em7とAm7で静かに陰るため、浮遊感が出ます。",
  },
  {
    title: "都会的なループを完成させよう",
    answer: ["Dm7", "G7", "Em7", "Am7"],
    features: ["都会的", "おしゃれ", "切ない"],
    explanation:
      "Dm7からG7はCへ行きたくなる形ですが、Cへ行かずEm7、Am7へ流れることで少し外したおしゃれさが出ます。解決を引き延ばす感覚が都会的です。",
  },
  {
    title: "希望のポップ進行を完成させよう",
    answer: ["C", "F", "G", "C"],
    features: ["明るい", "安定感", "爽やか"],
    explanation:
      "Cで始まり、Fで景色を広げ、Gで戻る力を作り、Cへ帰ります。トニックへきれいに戻るため、希望のある明るさが出ます。",
  },
  {
    title: "しっとりマイナー進行を完成させよう",
    answer: ["Am", "Dm", "G", "C"],
    features: ["切ない", "穏やか", "感動的"],
    explanation:
      "Amで切なさを出し、Dmでさらに深め、GからCへ明るく解決します。暗さから明るさへ抜けるため、しっとりした感動につながります。",
  },
  {
    title: "ドラマチックな転回進行を完成させよう",
    answer: ["C", "E7", "Am", "F"],
    features: ["ドラマチック", "切ない", "緊張感"],
    explanation:
      "E7はCメジャーの中では少し外から来た響きで、Amへ強く進みます。普通のCから急にE7へ行くことで色が変わり、Amで切なさが強まります。",
  },
  {
    title: "アニソン風進行を完成させよう",
    answer: ["F", "G", "Am", "Am"],
    features: ["疾走感", "切ない", "ドラマチック"],
    explanation:
      "FからGで上がる期待感を作り、Amへ着地すると明るくなりきらない切なさが残ります。同じAmを続けることで感情を押し出す力が出ます。",
  },
  {
    title: "ロックのパワー進行を完成させよう",
    answer: ["C", "G", "F", "G"],
    features: ["明るい", "疾走感", "王道感"],
    explanation:
      "Cで始まり、Gで勢いを出し、Fで広げ、もう一度Gで次へ進みます。解決しきらずにGで押すので、前進感が強くなります。",
  },
  {
    title: "泣きの進行を完成させよう",
    answer: ["F", "E7", "Am", "G"],
    features: ["切ない", "緊張感", "ドラマチック"],
    explanation:
      "FからE7へ半音で下がる動きが強い切なさを作ります。E7はAmへ向かう緊張を持ち、最後のGで余韻を残すので泣きの雰囲気が出ます。",
  },
  {
    title: "ディスコ風進行を完成させよう",
    answer: ["Am7", "Dm7", "G7", "Cmaj7"],
    features: ["おしゃれ", "都会的", "明るい"],
    explanation:
      "m7やmaj7の柔らかい響きに、G7からCmaj7への解決が入ります。暗さと明るさが滑らかに入れ替わるので、踊れるおしゃれ感が出ます。",
  },
  {
    title: "フォーク風進行を完成させよう",
    answer: ["C", "F", "C", "G"],
    features: ["穏やか", "明るい", "安定感"],
    explanation:
      "CとFの行き来は素朴で分かりやすい広がりを作ります。最後のGが次のCへ戻る力を持つので、歌いやすいフォーク風の流れになります。",
  },
  {
    title: "ジャジーな循環進行を完成させよう",
    answer: ["Cmaj7", "A7", "Dm7", "G7"],
    features: ["おしゃれ", "都会的", "緊張感"],
    explanation:
      "A7はDm7へ向かうセカンダリードミナントです。Cmaj7の安定からA7で色を変え、Dm7、G7でCへ戻りたくなる流れを作ります。",
  },
  {
    title: "爽快なメジャー進行を完成させよう",
    answer: ["D", "A", "Bm", "G"],
    features: ["爽やか", "明るい", "王道感"],
    explanation:
      "Dで明るく始まり、Aで前進し、Bmで少し切なさを足し、Gで広がります。キーがDになると、Cより少し高く爽快に感じやすくなります。",
  },
  {
    title: "切ないDメジャー進行を完成させよう",
    answer: ["G", "A", "F#m", "Bm"],
    features: ["切ない", "感動的", "王道感"],
    explanation:
      "GからAで期待を作り、F#mからBmでマイナーの陰りへ入ります。明るいキーの中で相対的に暗い場所へ寄るため、切なさが強く出ます。",
  },
  {
    title: "明るいセブンス進行を完成させよう",
    answer: ["C", "A7", "Dm", "G7"],
    features: ["明るい", "おしゃれ", "王道感"],
    explanation:
      "A7はDmへ向かうための一時的なドミナントです。普通のCからA7へ行くことで少し色気が出て、Dm、G7を経由してCへ戻る準備が整います。",
  },
  {
    title: "不思議な浮遊進行を完成させよう",
    answer: ["Fmaj7", "G", "Em7", "A7"],
    features: ["浮遊感", "緊張感", "おしゃれ"],
    explanation:
      "Fmaj7の柔らかさからGで進み、Em7で少し陰り、A7でDmへ行きたくなる緊張を残します。最後に解決しきらないので不思議な浮遊感が出ます。",
  },
  {
    title: "壮大なエンディング進行を完成させよう",
    answer: ["F", "G", "Em", "Am", "Dm", "G", "C"],
    features: ["感動的", "ドラマチック", "安定感"],
    explanation:
      "F、G、Em、Amで感情を高め、Dm、G、Cでサブドミナント、ドミナント、トニックへ解決します。長い旅からCへ帰るような終止感が出ます。",
  },
];

const FEATURE_POOL = [
  "明るい",
  "切ない",
  "感動的",
  "おしゃれ",
  "都会的",
  "疾走感",
  "不安定",
  "緊張感",
  "王道感",
  "暗い",
  "浮遊感",
  "ドラマチック",
  "安定感",
  "爽やか",
  "穏やか",
];

const NOTE_OFFSETS = {
  C: -9,
  "C#": -8,
  Db: -8,
  D: -7,
  "D#": -6,
  Eb: -6,
  E: -5,
  F: -4,
  "F#": -3,
  Gb: -3,
  G: -2,
  "G#": -1,
  Ab: -1,
  A: 0,
  "A#": 1,
  Bb: 1,
  B: 2,
};

const SEMITONE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const PITCH_ROWS = ["A5", "G#5", "G5", "F#5", "F5", "E5", "D#5", "D5", "C#5", "C5", "B4", "A#4", "A4", "G#4", "G4", "F#4", "F4", "E4", "D#4", "D4", "C#4", "C4"];
const TUNE_ROTATION = ["twinkle", "ode", "sakura", "auld", "amazing", "greensleeves", "london", "mary"];

const PUBLIC_DOMAIN_TUNES = {
  twinkle: {
    title: "きらきら星",
    reference: "メロディ例: きらきら星 / Ah! vous dirai-je, maman",
    bpm: 96,
    patternSteps: 16,
    melody: [
      ["C5", 0, 1],
      ["C5", 1, 1],
      ["G5", 2, 1],
      ["G5", 3, 1],
      ["A5", 4, 1],
      ["A5", 5, 1],
      ["G5", 6, 2],
      ["F5", 8, 1],
      ["F5", 9, 1],
      ["E5", 10, 1],
      ["E5", 11, 1],
      ["D5", 12, 1],
      ["D5", 13, 1],
      ["C5", 14, 2],
    ],
  },
  ode: {
    title: "歓喜の歌",
    reference: "メロディ例: ベートーヴェン 交響曲第9番より",
    bpm: 120,
    patternSteps: 16,
    melody: [
      ["E4", 0, 1],
      ["E4", 1, 1],
      ["F4", 2, 1],
      ["G4", 3, 1],
      ["G4", 4, 1],
      ["F4", 5, 1],
      ["E4", 6, 1],
      ["D4", 7, 1],
      ["C4", 8, 1],
      ["C4", 9, 1],
      ["D4", 10, 1],
      ["E4", 11, 1],
      ["E4", 12, 1],
      ["D4", 13, 1],
      ["D4", 14, 2],
    ],
  },
  sakura: {
    title: "さくらさくら",
    reference: "メロディ例: 日本古謡 さくらさくら",
    bpm: 72,
    patternSteps: 16,
    melody: [
      ["A4", 0, 1],
      ["A4", 1, 1],
      ["B4", 2, 2],
      ["A4", 4, 1],
      ["A4", 5, 1],
      ["B4", 6, 2],
      ["A4", 8, 1],
      ["B4", 9, 1],
      ["C5", 10, 1],
      ["B4", 11, 1],
      ["A4", 12, 1],
      ["B4", 13, 1],
      ["A4", 14, 2],
    ],
  },
  auld: {
    title: "蛍の光",
    reference: "メロディ例: Auld Lang Syne / 蛍の光",
    bpm: 82,
    patternSteps: 16,
    melody: [
      ["G4", 0, 1],
      ["C5", 1, 1],
      ["B4", 2, 1],
      ["C5", 3, 1],
      ["E5", 4, 1],
      ["D5", 5, 1],
      ["C5", 6, 1],
      ["D5", 7, 1],
      ["E5", 8, 1],
      ["C5", 9, 1],
      ["C5", 10, 1],
      ["E5", 11, 1],
      ["G5", 12, 1],
      ["A5", 13, 1],
      ["A5", 14, 1],
      ["G5", 15, 1],
    ],
  },
  amazing: {
    title: "アメイジング・グレイス",
    reference: "メロディ例: Amazing Grace",
    bpm: 72,
    patternSteps: 16,
    melody: [
      ["G4", 0, 2],
      ["C5", 2, 2],
      ["E5", 4, 1],
      ["C5", 5, 1],
      ["E5", 6, 2],
      ["D5", 8, 2],
      ["C5", 10, 2],
      ["A4", 12, 1],
      ["G4", 13, 1],
      ["G4", 14, 2],
    ],
  },
  greensleeves: {
    title: "グリーンスリーブス",
    reference: "メロディ例: Greensleeves",
    bpm: 86,
    patternSteps: 16,
    melody: [
      ["A4", 0, 1],
      ["C5", 1, 2],
      ["D5", 3, 1],
      ["E5", 4, 2],
      ["F5", 6, 1],
      ["E5", 7, 1],
      ["D5", 8, 2],
      ["B4", 10, 1],
      ["G4", 11, 1],
      ["A4", 12, 3],
    ],
  },
  london: {
    title: "ロンドン橋",
    reference: "メロディ例: London Bridge Is Falling Down",
    bpm: 112,
    patternSteps: 16,
    melody: [
      ["G4", 0, 1],
      ["A4", 1, 1],
      ["G4", 2, 1],
      ["F4", 3, 1],
      ["E4", 4, 1],
      ["F4", 5, 1],
      ["G4", 6, 2],
      ["D4", 8, 1],
      ["E4", 9, 1],
      ["F4", 10, 2],
      ["E4", 12, 1],
      ["F4", 13, 1],
      ["G4", 14, 2],
    ],
  },
  mary: {
    title: "メリーさんのひつじ",
    reference: "メロディ例: Mary Had a Little Lamb",
    bpm: 116,
    patternSteps: 16,
    melody: [
      ["E4", 0, 1],
      ["D4", 1, 1],
      ["C4", 2, 1],
      ["D4", 3, 1],
      ["E4", 4, 1],
      ["E4", 5, 1],
      ["E4", 6, 2],
      ["D4", 8, 1],
      ["D4", 9, 1],
      ["D4", 10, 2],
      ["E4", 12, 1],
      ["G4", 13, 1],
      ["G4", 14, 2],
    ],
  },
};

function expandTuneMelody(tune, totalSteps) {
  const events = tune.melody.map(([note, step, duration]) => ({ note, step, duration }));
  const expanded = [];

  for (let offset = 0; offset < totalSteps; offset += tune.patternSteps) {
    events.forEach((event) => {
      const step = event.step + offset;
      if (step < totalSteps) {
        expanded.push({
          ...event,
          step,
          duration: Math.min(event.duration, totalSteps - step),
        });
      }
    });
  }

  return expanded;
}

function getCanonMelody() {
  return [
    { note: "E5", step: 0, duration: 0.85 },
    { note: "C5", step: 1, duration: 0.85 },
    { note: "E5", step: 2, duration: 0.85 },
    { note: "G5", step: 3, duration: 0.85 },
    { note: "D5", step: 4, duration: 0.85 },
    { note: "B4", step: 5, duration: 0.85 },
    { note: "D5", step: 6, duration: 0.85 },
    { note: "G5", step: 7, duration: 0.85 },
    { note: "C5", step: 8, duration: 0.85 },
    { note: "A4", step: 9, duration: 0.85 },
    { note: "C5", step: 10, duration: 0.85 },
    { note: "E5", step: 11, duration: 0.85 },
    { note: "B4", step: 12, duration: 0.85 },
    { note: "G4", step: 13, duration: 0.85 },
    { note: "B4", step: 14, duration: 0.85 },
    { note: "E5", step: 15, duration: 0.85 },
    { note: "A4", step: 16, duration: 0.85 },
    { note: "F4", step: 17, duration: 0.85 },
    { note: "A4", step: 18, duration: 0.85 },
    { note: "C5", step: 19, duration: 0.85 },
    { note: "G4", step: 20, duration: 0.85 },
    { note: "E4", step: 21, duration: 0.85 },
    { note: "G4", step: 22, duration: 0.85 },
    { note: "C5", step: 23, duration: 0.85 },
    { note: "A4", step: 24, duration: 0.85 },
    { note: "F4", step: 25, duration: 0.85 },
    { note: "A4", step: 26, duration: 0.85 },
    { note: "C5", step: 27, duration: 0.85 },
    { note: "B4", step: 28, duration: 0.85 },
    { note: "G4", step: 29, duration: 0.85 },
    { note: "B4", step: 30, duration: 0.85 },
    { note: "D5", step: 31, duration: 0.85 },
  ];
}

const QUESTIONS = QUESTION_DATA.map((question, index) => ({
  ...question,
  ...(() => {
    const totalSteps = question.answer.length * 4;
    if (question.demoPattern === "canon") {
      return {
        bpm: 84,
        demoTitle: "カノンのバイオリン風分散和音",
        reference: "メロディ例: パッヘルベルのカノンの有名な分散和音部分をCメジャーへ移調",
        demoNote:
          "原曲はDメジャーですが、このアプリでは問題のCメジャー進行に合わせて移調しています。",
        melody: getCanonMelody(),
      };
    }

    const tune = PUBLIC_DOMAIN_TUNES[question.tuneKey || TUNE_ROTATION[index % TUNE_ROTATION.length]];
    return {
      demoTitle: `${tune.title}で聴くコード進行`,
      reference: tune.reference,
      bpm: tune.bpm,
      demoNote:
        "知っているメロディをコード進行に乗せ、響きのキャラクターを覚えやすくしています。",
      melody: expandTuneMelody(tune, totalSteps),
    };
  })(),
}));

const CHORD_POOL = Array.from(
  new Set([
    ...QUESTIONS.flatMap((question) => question.answer),
    "Bdim",
    "F7",
    "Bb",
    "Eb",
    "D7",
    "Gm",
  ]),
);

function noteToFrequency(note) {
  const match = note.match(/^([A-G](?:#|b)?)(\d)$/);
  if (!match) return 440;
  const [, pitch, octaveText] = match;
  const octave = Number(octaveText);
  const semitonesFromA4 = NOTE_OFFSETS[pitch] + (octave - 4) * 12;
  return 440 * 2 ** (semitonesFromA4 / 12);
}

function noteNameFromSemitone(semitone) {
  return SEMITONE_NAMES[((semitone % 12) + 12) % 12];
}

function getChordNotes(chord, octave = 4) {
  const normalized = chord.replace(/\/.+$/, "");
  const match = normalized.match(/^([A-G](?:#|b)?)(.*)$/);
  if (!match) return ["C4", "E4", "G4"];

  const [, root, quality] = match;
  const rootSemitone = (NOTE_OFFSETS[root] + 9 + 12) % 12;
  const lowerQuality = quality.toLowerCase();
  let intervals = [0, 4, 7];

  if (lowerQuality.includes("m7b5")) {
    intervals = [0, 3, 6, 10];
  } else if (lowerQuality.includes("dim")) {
    intervals = [0, 3, 6];
  } else if (lowerQuality.includes("maj7")) {
    intervals = [0, 4, 7, 11];
  } else if (lowerQuality.includes("m7")) {
    intervals = [0, 3, 7, 10];
  } else if (lowerQuality === "m") {
    intervals = [0, 3, 7];
  } else if (lowerQuality.includes("7")) {
    intervals = [0, 4, 7, 10];
  }

  return intervals.map((interval) => {
    const absolute = rootSemitone + interval;
    const noteOctave = octave + Math.floor(absolute / 12);
    return `${noteNameFromSemitone(absolute)}${noteOctave}`;
  });
}

function fitNoteToPianoRoll(note) {
  if (PITCH_ROWS.includes(note)) return note;
  const match = note.match(/^([A-G](?:#|b)?)(\d)$/);
  if (!match) return "C5";
  const [, pitch] = match;
  const candidates = [`${pitch}4`, `${pitch}5`, `${pitch}3`];
  return candidates.find((candidate) => PITCH_ROWS.includes(candidate)) || "C5";
}

function getAudioContext(audioContextRef) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  if (!audioContextRef.current) {
    audioContextRef.current = new AudioContext();
  }

  const context = audioContextRef.current;
  if (context.state === "suspended") {
    context.resume();
  }

  return context;
}

function playPianoToneAt(context, note, startTime, duration = 0.8, volume = 0.12) {
  const frequency = noteToFrequency(note);
  const output = context.createGain();
  const filter = context.createBiquadFilter();

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(5200, startTime);
  filter.frequency.exponentialRampToValueAtTime(1700, startTime + duration);
  output.gain.setValueAtTime(0.0001, startTime);
  output.gain.exponentialRampToValueAtTime(volume, startTime + 0.008);
  output.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume * 0.34), startTime + 0.12);
  output.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  filter.connect(output);
  output.connect(context.destination);

  [
    { ratio: 1, gain: 1, type: "triangle" },
    { ratio: 2.01, gain: 0.28, type: "sine" },
    { ratio: 3.01, gain: 0.13, type: "sine" },
  ].forEach((partial) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = partial.type;
    oscillator.frequency.setValueAtTime(frequency * partial.ratio, startTime);
    oscillator.detune.setValueAtTime((Math.random() - 0.5) * 6, startTime);
    gain.gain.setValueAtTime(partial.gain, startTime);
    oscillator.connect(gain);
    gain.connect(filter);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.04);
  });
}

function playChordAt(context, chord, startTime, duration = 1.15, volume = 0.12) {
  const notes = getChordNotes(chord, chord.includes("maj7") || chord.includes("7") ? 3 : 4);
  const bassNote = getChordNotes(chord, 2)[0];
  playPianoToneAt(context, bassNote, startTime, duration * 1.08, volume * 0.62);
  playPianoToneAt(context, bassNote, startTime + duration * 0.5, duration * 0.56, volume * 0.36);
  notes.forEach((note, index) => {
    playPianoToneAt(
      context,
      note,
      startTime + 0.035 + index * 0.018,
      duration * 0.95,
      (volume * 0.92) / notes.length,
    );
  });
}

function playChord(audioContextRef, chord) {
  const context = getAudioContext(audioContextRef);
  if (!context) return;
  playChordAt(context, chord, context.currentTime, 1.2, 0.18);
}

function playNoteAt(context, note, startTime, duration = 0.3, volume = 0.16) {
  playPianoToneAt(context, note, startTime, duration, volume);
}

function arraysMatch(a, b) {
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

function setsMatch(a, b) {
  if (a.length !== b.length) return false;
  const bSet = new Set(b);
  return a.every((item) => bSet.has(item));
}

function getSortHint(selected, answer) {
  if (selected.length === 0) {
    return `まずは最初のコード「${answer[0]}」から置いてみましょう。`;
  }

  if (selected.length > answer.length) {
    return `コードが${selected.length - answer.length}個多いです。回答欄のコードをタップして取り消せます。`;
  }

  const wrongIndex = selected.findIndex((chord, index) => chord !== answer[index]);
  if (wrongIndex !== -1) {
    return `${wrongIndex + 1}番目を見直してみましょう。そこは「${selected[wrongIndex]}」ではなく、前後の機能を考えると別のコードが自然です。`;
  }

  if (selected.length < answer.length) {
    return `ここまでは合っています。次は「${answer[selected.length]}」につながると気持ちよく進みます。`;
  }

  return "コードの数は合っています。どこか1か所だけ順番が入れ替わっていないか確認しましょう。";
}

function getFeatureHint(selected, answer) {
  if (selected.length === 0) {
    return "まずは響きの第一印象を1つ選びましょう。明るい、切ない、安定感などから考えると入りやすいです。";
  }

  const missing = answer.filter((feature) => !selected.includes(feature));
  const extra = selected.filter((feature) => !answer.includes(feature));

  if (extra.length > 0) {
    return `「${extra[0]}」は少し離れています。コード進行の定番感、明るさ、緊張感のどれが強いか比べてみましょう。`;
  }

  if (missing.length > 0) {
    return `あと${missing.length}個近い特徴があります。今選んだ言葉と一緒に成立する雰囲気を探してみましょう。`;
  }

  return "選んだ特徴の数は合っています。似た言葉同士を入れ替えて考えてみましょう。";
}

function App() {
  const audioContextRef = useRef(null);
  const [mode, setMode] = useState("sort");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChords, setSelectedChords] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortResult, setSortResult] = useState(null);
  const [featureResult, setFeatureResult] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [sparkKey, setSparkKey] = useState(0);

  const question = QUESTIONS[questionIndex];
  const isSortCorrect = sortResult === "correct" || sortResult === "revealed";
  const isFeatureCorrect = featureResult === "correct" || featureResult === "revealed";
  const currentSolved = mode === "sort" ? isSortCorrect : isFeatureCorrect;

  const progressLabel = useMemo(
    () => `${questionIndex + 1} / ${QUESTIONS.length}`,
    [questionIndex],
  );

  function resetCurrent() {
    if (mode === "sort") {
      setSelectedChords([]);
      setSortResult(null);
    } else {
      setSelectedFeatures([]);
      setFeatureResult(null);
    }
  }

  function goNext() {
    const isLast = questionIndex === QUESTIONS.length - 1;
    if (isLast) {
      setCompleted(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedChords([]);
    setSelectedFeatures([]);
    setSortResult(null);
    setFeatureResult(null);
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setSortResult(null);
    setFeatureResult(null);
  }

  function handleChordClick(chord) {
    playChord(audioContextRef, chord);
    setSparkKey((key) => key + 1);
    setSelectedChords((current) => [...current, chord]);
  }

  function checkSortAnswer() {
    setSortResult(arraysMatch(selectedChords, question.answer) ? "correct" : "wrong");
  }

  function checkFeatureAnswer() {
    setFeatureResult(
      setsMatch(selectedFeatures, question.features) ? "correct" : "wrong",
    );
  }

  function toggleFeature(feature) {
    setSelectedFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature],
    );
  }

  function restartAll() {
    setQuestionIndex(0);
    setSelectedChords([]);
    setSelectedFeatures([]);
    setSortResult(null);
    setFeatureResult(null);
    setCompleted(false);
  }

  return (
    <main className="app-shell">
      <section className="quiz-stage" aria-live="polite">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <header className="top-bar">
          <div>
            <p className="eyebrow">コード進行マスタークイズ</p>
            <h1>見て、押して、聴いて覚えるコード進行</h1>
          </div>
          <div className="progress-pill">
            <span>問題</span>
            <strong>{progressLabel}</strong>
          </div>
        </header>

        <div className="mode-switch" role="tablist" aria-label="クイズモード">
          <button
            className={mode === "sort" ? "active" : ""}
            onClick={() => changeMode("sort")}
            type="button"
            role="tab"
            aria-selected={mode === "sort"}
          >
            並び替え
          </button>
          <button
            className={mode === "feature" ? "active" : ""}
            onClick={() => changeMode("feature")}
            type="button"
            role="tab"
            aria-selected={mode === "feature"}
          >
            特徴選択
          </button>
        </div>

        {completed ? (
          <section className="complete-panel">
            <p className="cleared-label">全問クリア！</p>
            <h2>コード進行の耳と感覚が育ってきました</h2>
            <p>
              もう一度プレイして、コードを押した時の響きと特徴の言葉を結びつけてみましょう。
            </p>
            <button className="primary-action" onClick={restartAll} type="button">
              最初から遊ぶ
            </button>
          </section>
        ) : (
          <section className={`question-card ${currentSolved ? "is-correct" : ""}`}>
            <div className="sparkle-field" key={sparkKey} />
            {mode === "sort" ? (
              <SortQuiz
                audioContextRef={audioContextRef}
                question={question}
                selectedChords={selectedChords}
                result={sortResult}
                onChordClick={handleChordClick}
                onRemoveChord={(index) =>
                  setSelectedChords((current) =>
                    current.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
                onCheck={checkSortAnswer}
                onReveal={() => {
                  setSelectedChords(question.answer);
                  setSortResult("revealed");
                }}
                onReset={resetCurrent}
                onNext={goNext}
              />
            ) : (
              <FeatureQuiz
                audioContextRef={audioContextRef}
                question={question}
                selectedFeatures={selectedFeatures}
                result={featureResult}
                onToggleFeature={toggleFeature}
                onCheck={checkFeatureAnswer}
                onReveal={() => {
                  setSelectedFeatures(question.features);
                  setFeatureResult("revealed");
                }}
                onReset={resetCurrent}
                onNext={goNext}
              />
            )}
          </section>
        )}
      </section>
    </main>
  );
}

function SortQuiz({
  audioContextRef,
  question,
  selectedChords,
  result,
  onChordClick,
  onRemoveChord,
  onCheck,
  onReveal,
  onReset,
  onNext,
}) {
  return (
    <>
      <div className="question-heading">
        <p className="mode-label">コード進行並び替えクイズ</p>
        <h2>{question.title}</h2>
      </div>

      <div className="answer-lane" aria-label="回答欄">
        {selectedChords.length === 0 ? (
          <span className="placeholder">コードをタップして並べよう</span>
        ) : (
          selectedChords.map((chord, index) => (
            <button
              className="answer-chip"
              key={`${chord}-${index}`}
              onClick={() => onRemoveChord(index)}
              type="button"
              aria-label={`${chord}を取り消す`}
            >
              {chord}
            </button>
          ))
        )}
      </div>

      <div className="chord-grid" aria-label="コードパネル">
        {CHORD_POOL.map((chord) => (
          <button
            className="chord-button"
            key={chord}
            onClick={() => onChordClick(chord)}
            type="button"
          >
            <span>{chord}</span>
          </button>
        ))}
      </div>

      <QuizActions
        audioContextRef={audioContextRef}
        question={question}
        result={result}
        wrongText="惜しい！もう一度考えてみよう"
        hint={getSortHint(selectedChords, question.answer)}
        explanation={question.explanation}
        onCheck={onCheck}
        onReveal={onReveal}
        onReset={onReset}
        onNext={onNext}
      />
    </>
  );
}

function FeatureQuiz({
  audioContextRef,
  question,
  selectedFeatures,
  result,
  onToggleFeature,
  onCheck,
  onReveal,
  onReset,
  onNext,
}) {
  return (
    <>
      <div className="question-heading">
        <p className="mode-label">特徴選択クイズ</p>
        <h2>{question.answer.join(" → ")}</h2>
      </div>

      <div className="feature-grid" aria-label="特徴パネル">
        {FEATURE_POOL.map((feature) => {
          const selected = selectedFeatures.includes(feature);
          return (
            <button
              className={`feature-tag ${selected ? "selected" : ""}`}
              key={feature}
              onClick={() => onToggleFeature(feature)}
              type="button"
              aria-pressed={selected}
            >
              {feature}
            </button>
          );
        })}
      </div>

      <QuizActions
        audioContextRef={audioContextRef}
        question={question}
        result={result}
        wrongText="惜しい！特徴をもう一度考えてみよう"
        hint={getFeatureHint(selectedFeatures, question.features)}
        explanation={question.explanation}
        onCheck={onCheck}
        onReveal={onReveal}
        onReset={onReset}
        onNext={onNext}
      />
    </>
  );
}

function QuizActions({
  audioContextRef,
  question,
  result,
  wrongText,
  hint,
  explanation,
  onCheck,
  onReveal,
  onReset,
  onNext,
}) {
  const resultRef = useRef(null);

  useEffect(() => {
    if (!result || !resultRef.current) return;
    resultRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [result]);

  return (
    <div className="action-zone">
      <div className="button-row">
        <button className="primary-action" onClick={onCheck} type="button">
          判定
        </button>
        <button className="answer-action" onClick={onReveal} type="button">
          正解を見る
        </button>
        <button className="secondary-action" onClick={onReset} type="button">
          リセット
        </button>
      </div>

      {result && (
        <div
          className={`result-box ${result !== "wrong" ? "correct" : "wrong"}`}
          ref={resultRef}
        >
          <strong>
            {result === "correct"
              ? "正解！"
              : result === "revealed"
                ? "正解はこちら！"
                : wrongText}
          </strong>
          {result === "wrong" && (
            <p>
              <span className="hint-label">ヒント</span>
              {hint}
            </p>
          )}
          {result !== "wrong" && (
            <>
              <div className="answer-insight">
                <div>
                  <span className="insight-label">特徴</span>
                  <div className="feature-summary">
                    {question.features.map((feature) => (
                      <span key={feature}>{feature}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="insight-label">解説</span>
                  <p>{explanation}</p>
                </div>
              </div>
              <DawPlayer question={question} audioContextRef={audioContextRef} />
              <button className="next-action" onClick={onNext} type="button">
                次の問題へ
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function DawPlayer({ question, audioContextRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackLabel, setPlaybackLabel] = useState("再生");
  const [playhead, setPlayhead] = useState(-1);
  const timerRef = useRef([]);
  const timelineRef = useRef(null);
  const stepsPerChord = 4;
  const stepDuration = 30 / question.bpm;
  const totalSteps = question.answer.length * stepsPerChord;

  useEffect(
    () => () => {
      timerRef.current.forEach((timerId) => window.clearTimeout(timerId));
    },
    [],
  );

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline || playhead < 0) return;
    const maxScroll = timeline.scrollWidth - timeline.clientWidth;
    if (maxScroll <= 0) return;
    const target =
      (timeline.scrollWidth * playhead) / totalSteps - timeline.clientWidth * 0.38;
    timeline.scrollTo({
      left: Math.max(0, Math.min(maxScroll, target)),
      behavior: "smooth",
    });
  }, [playhead, totalSteps]);

  function stopDemo() {
    timerRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timerRef.current = [];
    setIsPlaying(false);
    setPlaybackLabel("再生");
    setPlayhead(-1);
  }

  function playDemo(kind = "full") {
    stopDemo();
    const context = getAudioContext(audioContextRef);
    if (!context) return;

    const startAt = context.currentTime + 0.08;
    question.answer.forEach((chord, chordIndex) => {
      playChordAt(
        context,
        chord,
        startAt + chordIndex * stepsPerChord * stepDuration,
        stepDuration * 3.7,
        0.2,
      );
    });

    if (kind === "full") {
      question.melody.forEach(({ note, step, duration }) => {
        playNoteAt(
          context,
          note,
          startAt + step * stepDuration,
          Math.max(0.12, duration * stepDuration * 0.86),
          0.075,
        );
      });
    }

    setIsPlaying(true);
    setPlaybackLabel(kind === "chords" ? "コードだけ再生中" : "再生中");
    timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    for (let step = 0; step < totalSteps; step += 1) {
      const timerId = window.setTimeout(() => {
        setPlayhead(step);
      }, step * stepDuration * 1000);
      timerRef.current.push(timerId);
    }

    timerRef.current.push(
      window.setTimeout(() => {
        setIsPlaying(false);
        setPlaybackLabel("再生");
        setPlayhead(-1);
      }, totalSteps * stepDuration * 1000 + 260),
    );
  }

  return (
    <section className="daw-panel" aria-label="DAW風コード進行プレイヤー">
      <div className="daw-header">
        <div>
          <span className="daw-kicker">GRAND PIANO VIEW</span>
          <h3>{question.demoTitle}</h3>
          <p className="reference-line">{question.reference}</p>
          <p className="bpm-line">BPM {question.bpm}</p>
          <p>{question.demoNote}</p>
        </div>
        <div className="play-controls">
          <button
            className="play-demo"
            onClick={isPlaying ? stopDemo : () => playDemo("full")}
            type="button"
          >
            {isPlaying ? "停止" : "全体再生"}
          </button>
          <button
            className="chord-demo"
            onClick={isPlaying ? stopDemo : () => playDemo("chords")}
            type="button"
          >
            {isPlaying ? playbackLabel : "コードだけ"}
          </button>
        </div>
      </div>

      <div className="timeline" ref={timelineRef} style={{ "--total-steps": totalSteps }}>
        <div className="chord-track">
          {question.answer.map((chord, index) => (
            <div
              className={`chord-region ${
                playhead >= index * stepsPerChord && playhead < (index + 1) * stepsPerChord
                  ? "active"
                  : ""
              }`}
              key={`${chord}-${index}`}
            >
              {chord}
            </div>
          ))}
        </div>

        <div className="piano-roll">
          <div className="pitch-labels">
            {PITCH_ROWS.map((pitch) => (
              <span key={pitch}>{pitch}</span>
            ))}
          </div>
          <div className="note-grid">
            {PITCH_ROWS.map((pitch) => (
              <div className="pitch-row" key={pitch}>
                {question.melody
                  .filter((event) => event.note === pitch)
                  .map((event, index) => (
                    <span
                      className="note-block"
                      key={`${event.note}-${event.step}-${index}`}
                      style={{
                        "--start": event.step,
                        "--duration": event.duration,
                      }}
                    >
                      {event.note}
                    </span>
                  ))}
              </div>
            ))}
            {playhead >= 0 && (
              <span className="playhead" style={{ "--playhead": playhead }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
