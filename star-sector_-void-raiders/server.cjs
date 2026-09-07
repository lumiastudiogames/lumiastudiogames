var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
var briefingCache = /* @__PURE__ */ new Map();
var reactionCache = /* @__PURE__ */ new Map();
app.post("/api/companion/briefing", async (req, res) => {
  const { sector, shipName, shipDesc, credits } = req.body;
  const cacheKey = `briefing_${sector}_${shipName}`;
  if (briefingCache.has(cacheKey)) {
    return res.json(briefingCache.get(cacheKey));
  }
  try {
    const prompt = `Gere uma transmiss\xE3o t\xE1tica e detalhada para o Setor espacial ${sector}/50. O jogador est\xE1 pilotando a nave "${shipName}" (${shipDesc}). Ele possui atualmente ${credits} cr\xE9ditos. Use um tom de IA hologr\xE1fica de bordo inteligente, ligeiramente ir\xF4nica, mas muito focada no sucesso militar. Descreva os perigos do setor, a presen\xE7a de piratas Void Raiders e d\xEA uma dica de combate.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "Voc\xEA \xE9 a A.V.A (Assistente Virtual de Astro-navega\xE7\xE3o), a intelig\xEAncia artificial t\xE1tica de bordo da nave do Capit\xE3o no jogo Star Sector: Void Raiders. Escreva estritamente em portugu\xEAs.",
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            sectorName: {
              type: import_genai.Type.STRING,
              description: "Um nome de setor espacial ficcional, sonoro e amea\xE7ador em portugu\xEAs (ex: V\xE1cuo de Aquila, Cintur\xE3o de Dr\xE1conis)."
            },
            hazardLevel: {
              type: import_genai.Type.STRING,
              description: "O n\xEDvel de perigo do setor (ex: BAIXO, MODERADO, CR\xCDTICO, EXTREMO)."
            },
            anomaly: {
              type: import_genai.Type.STRING,
              description: "Uma anomalia c\xF3smica ativa ou modificador de jogabilidade (ex: Radia\xE7\xE3o Solar, Tempestade de \xCDons, Vento Qu\xE2ntico, Distor\xE7\xE3o Temporal)."
            },
            briefing: {
              type: import_genai.Type.STRING,
              description: "A transmiss\xE3o de voz t\xE1tica de A.V.A direcionada ao jogador. M\xE1ximo de 3 frases curtas."
            }
          },
          required: ["sectorName", "hazardLevel", "anomaly", "briefing"]
        }
      }
    });
    const data = JSON.parse(response.text || "{}");
    if (data.sectorName && data.briefing) {
      briefingCache.set(cacheKey, data);
    }
    res.json(data);
  } catch (error) {
    const fallbackSector = sector || 1;
    console.log(`[Companion Standby] Local tactical fallback loaded for Sector ${fallbackSector}.`);
    const prefixes = ["V\xE1cuo de", "N\xE9voa de", "Cintur\xE3o de", "Fenda de", "Setor Sombra", "Abismo de", "Nuvem de", "Fronteira de", "Corredor de"];
    const suffixes = ["Aquila", "Dr\xE1conis", "Orion", "Vega", "Antares", "Sirius", "Centauri", "Void Raiders", "Helios", "Krypton", "Arcturus"];
    const anomalies = ["Distor\xE7\xE3o Temporal", "Tempestade de \xCDons", "Radia\xE7\xE3o Solar C\xF3smica", "Nuvem de Antimat\xE9ria", "Vento de Neutrons", "Frequ\xEAncias Fantasmas"];
    const hazards = ["M\xCDNIMO", "MODERADO", "PERIGOSO", "CR\xCDTICO", "EXTREMO"];
    const idx1 = (fallbackSector * 7 + shipName.length) % prefixes.length;
    const idx2 = (fallbackSector * 13 + credits) % suffixes.length;
    const idx3 = fallbackSector * 3 % anomalies.length;
    const hazardIdx = Math.min(hazards.length - 1, Math.floor(fallbackSector / 10));
    const computedSectorName = `${prefixes[idx1]} ${suffixes[idx2]}`;
    const computedAnomaly = anomalies[idx3];
    const computedHazard = hazards[hazardIdx];
    const briefings = [
      `Capit\xE3o, nossos radares indicam fragmentos de meteoros altamente densificados \xE0 frente. Prepare os propulsores e mantenha o dedo no gatilho!`,
      `Alerta: Sensores acusam assinaturas de assalto dos Void Raiders camuflados nos detritos c\xF3smicos. Desviar \xE9 imposs\xEDvel!`,
      `Interfer\xEAncia qu\xE2ntica alta. A gravidade local est\xE1 inst\xE1vel. Recolha todo o combust\xEDvel que encontrar para n\xE3o flutuar \xE0 deriva!`,
      `Nave ${shipName}, os sensores biol\xF3gicos detectaram ondas t\xE9rmicas intensas. Mantenha os escudos ativos a todo custo!`,
      `Excelente momento para coletar cr\xE9ditos perdidos, Capit\xE3o. Mas fique atento: anomalias gravim\xE9tricas est\xE3o em curso.`
    ];
    const computedBriefing = briefings[(fallbackSector + shipName.length) % briefings.length];
    res.json({
      sectorName: computedSectorName,
      hazardLevel: computedHazard,
      anomaly: computedAnomaly,
      briefing: computedBriefing
    });
  }
});
app.post("/api/companion/reaction", async (req, res) => {
  const { event, sector, shipName } = req.body;
  const cacheKey = `reaction_${event}_${sector}_${shipName}`;
  if (reactionCache.has(cacheKey)) {
    return res.json(reactionCache.get(cacheKey));
  }
  try {
    const prompt = `O jogador acabou de passar pelo seguinte evento no jogo: "${event}" no Setor ${sector} pilotando a nave "${shipName}". Escreva um coment\xE1rio falado por voc\xEA em formato de r\xE1dio de 1 frase r\xE1pida e marcante.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "Voc\xEA \xE9 a A.V.A, a assistente hologr\xE1fica de bordo sarc\xE1stica e dedicada. Reaja ao evento em portugu\xEAs de forma concisa (m\xE1ximo 15 palavras). Seja encorajadora se ele vencer, sarc\xE1stica mas acolhedora se ele morrer, alarmada se a vida estiver baixa, e t\xE1tica nas demais situa\xE7\xF5es.",
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            text: {
              type: import_genai.Type.STRING,
              description: "A frase curta de r\xE1dio em portugu\xEAs de A.V.A."
            }
          },
          required: ["text"]
        }
      }
    });
    const data = JSON.parse(response.text || "{}");
    if (data.text) {
      reactionCache.set(cacheKey, data);
    }
    res.json(data);
  } catch (error) {
    console.log(`[Companion Standby] Local reaction feedback active.`);
    const event2 = req.body.event;
    let fallback = "Sistemas da IA operando em economia de energia. Boa sorte, Capit\xE3o.";
    const reactionPools = {
      victory: [
        "Setor pacificado. \xD3timo trabalho eliminando os perigos da zona, Capit\xE3o.",
        "\xD3tima manobra, Capit\xE3o! Setor limpo e pronto para saltar.",
        "Limpeza de destro\xE7os conclu\xEDda. Seus reflexos est\xE3o excelentes hoje!"
      ],
      death: [
        "Integridade do casco esgotada. Iniciando protocolo de ressurrei\xE7\xE3o e clonagem imediata.",
        "Sistemas falharam. N\xE3o se preocupe, salvamento t\xE1tico recuperou seu sinal neural.",
        "Nave destru\xEDda. No pr\xF3ximo setor teremos reatores novos de f\xE1brica!"
      ],
      low_health: [
        "Alerta: N\xEDveis de escudo cr\xEDticos! Pilote na defensiva ou desvie!",
        "Perigo! Energia defensiva abaixo dos limites seguros. Sobreviva!",
        "Chassis danificado. Evite colis\xF5es agora, Capit\xE3o!"
      ],
      high_score: [
        "Sensacional! Voc\xEA estabeleceu um novo recorde de efici\xEAncia de combate!",
        "Impressionante! A frota aliada est\xE1 monitorando seu desempenho incr\xEDvel.",
        "Essa pontua\xE7\xE3o merece uma men\xE7\xE3o honrosa nos arquivos da Esta\xE7\xE3o Espacial!"
      ],
      bomb_used: [
        "Bomba de v\xE1cuo detonada. Ondas t\xE9rmicas dissipadas com sucesso.",
        "Onda de choque t\xE1tica liberada. \xC1rea limpa com efic\xE1cia absoluta.",
        "Bomba at\xF4mica de fiss\xE3o limpou o quadrante!"
      ]
    };
    if (event2 && reactionPools[event2]) {
      const arr = reactionPools[event2];
      fallback = arr[Math.floor(Math.random() * arr.length)];
    }
    res.json({ text: fallback });
  }
});
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] running on http://localhost:${PORT}`);
  });
}
initServer();
//# sourceMappingURL=server.cjs.map
