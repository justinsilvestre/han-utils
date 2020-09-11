type Replacement =
  | [string, string]
  | [RegExp, string]
  | [RegExp, (substring: string, ...args: any[]) => string];
type Concatenation = string;
class MassReplacementAndConcat {
  baseText: string;
  operations: Array<Replacement | Concatenation> = [];

  constructor(baseText: string) {
    this.baseText = baseText;
  }

  replace(...replacement: Replacement) {
    this.operations.push(replacement);
    return this;
  }

  concat(string: string) {
    this.operations.push(string);
    return this;
  }

  execute() {
    let pendingReplacementOperations = this.operations.filter((o) =>
      typeof o !== "string"
    );
    let lines = "";
    for (const line of this.baseText.split("\n")) {
      let transformedLine = line;
      for (const operation of this.operations) {
        if (typeof operation === "string") {
        } else {
          const transformationResult = transformedLine
            .replace(operation[0], operation[1] as string)
            .trim();
          if (transformationResult.trim() !== transformedLine.trim()) {
            const doneReplacementIndex = pendingReplacementOperations.indexOf(
              operation,
            );
            if (doneReplacementIndex !== -1) {
              pendingReplacementOperations.splice(doneReplacementIndex, 1);
            }
          }
          transformedLine = transformationResult;
        }
      }

      lines += transformedLine + "\n";
    }

    if (pendingReplacementOperations.length) {
      for (const notDoneReplacement of pendingReplacementOperations) {
        console.error(`Replacement had no effect: ${notDoneReplacement}`);
      }
    }

    return lines +
      this.operations.filter((o) => typeof o === "string").join("");
  }
}

const forcedAtomicFigures = [
  "CDP-8CC6",
  "CDP-8BBE",
  "亠",
  "䒑",
  "中",
  "之",
  "竹",
  "文",
  "夕",
  "乃",
  "羊",
  "羽",
  "馬",
  "不",
  "覀",
  "斤",
  "大",
  "貝",
  "矢",
  "𤰔",
  "門",
  "面",
  "力",
  "石",
  "儿",
  "七",
  "五",
  "亙",
  "CDP-89AE",
  "CDP-8BF5",
  // "士",
  "光",
  "元",
  "癶",
  "西",
  "冎",
  "而",
  "冊",
  "GWS-U7680-08-VAR-001",
  "人",
  "亻",
  "𠂉",
  "彳",
  "亍",
  "火",
  "灬",
  "CDP-8CB5",
  "刀",
  "刂",
  "CDP-8968",
  "CDP-89CA",
  "爪",
  "爫",
  "手",
  "扌",
  "丿",
  "乀",
  "幺",
  "乡",
  "八",
  "丷",
  "卜",
  "⺊",
  "乛",
  "㇇",
  "𠃍",
  "𠃌",
  "乙",
  "⺄",
  "才",
  "CDP-88F1",
  "亅",
  "𠄌",
  "冂",
  "⺆",
  "彳",
  "亍",
  "𭕄",
  "彡",
  "CDP-8CBD",
  "コ",
  "㐄",
  "𫝀",
  "乂",
  "㐅",
  "小",
  "⺌",
  "羊",
  "𦍌",
  "牛",
  "𠂒",
  "木",
  "朩",
  "匕",
  "𠤎",
  "CDP-8BC5",
  "月",
  "⺼",
  "口",
  "囗",
  "勹",
  "𠂊",
  "CDP-8B6C",
  "丩",
  "𠂈",
  "卩",
  "CDP-88EE",
  "𠂎",
  "彐",
  "CDP-8BAB",
  "龴",
  "CDP-8C4E",
  "廾",
  "卄",
  "井",
  "龷",
  "曲",
  "CDP-89E0",
  "川",
  "𫶧",
  "巛",
  "巜",
  "丁",
  "丅",
  "止",
  "龰",
  "米",
  "𠂭",
  "GWS-U20087-11",
  "旡",
  "兂",
  "叀",
  "CDP-8BD0",
  "𤰔",
  "艮",
  "CDP-8B7C",
  "GWS-CDP-8B7C-VAR-001",
  "心",
  "㣺",
  "忄",
  "手",
  "扌",
  "龵",
  "水",
  "氵",
  "示",
  "礻",
  "衣",
  "衤",
  "長",
  "镸",
  "生",
  "龶",
  "艸",
  "艹",
  "立",
  "CDP-8BAE",
  "㠯",
  "母",
  "毋",
  "毌",
  "豕",
  "𧰨",
  "臼",
  "𦥑",
  "CDP-8CAC",
  "辵",
  "辶",
  "⻏",
  "气",
  "襾",
  "覀",
  "CDP-88B4",
  "爿",
  "丬",
  "业",
  "CDP-8D6B",
  "亞",
  "GWS-U2FF1-CDP-88A1-U4E00",
  "夂",
  "夊",
  "CDP-88E2",
  "冫",
  "⺀",
  "乇",
];

const FORCE_MEANINGLESS_REPLACEMENTS = {
  丆: "⿱一丿",
  亏: "⿱一丂",
  兀: "⿱一儿",
  吅: "⿰口口",
  殸: "⿰声殳",
  "𠓜": "⿰入入",
  "𠔼": "⿵冂一",
  "&CDP-8CE6;": "⿳一由八",
  "&CDP-8B7A;": "⿰亻丨",
  "&CDP-8D52;": "⿱十冖",
};

const patchKanjiDatabaseIdsText = (base: string) =>
  new MassReplacementAndConcat(base)
    .replace(
      "CDP-8DE0	&CDP-8DE0;	⿱丆且",
      "CDP-8DE0	&CDP-8DE0;	⿱&GWS-JUSTINSILVESTRE_U268FB-03-TOP;一",
    )
    .replace("U+4E02	丂	⿱一㇉", "U+4E02	丂	丂")
    .replace("U+76AE	皮	皮", "U+76AE	皮	⿸⿻&CDP-88E2;丨又")
    .replace(
      "U+7D55	絕	⿰糹&CDP-8CEA;",
      "U+7D55	絕	⿰糹&CDP-8CEA;	⿰糸&CDP-8CEA;[J]",
    )
    .replace(
      "U+7E6D	繭	⿱艹&CDP-8DDC;[GTJK]	⿱艹&CDP-8DDC;[J]",
      "U+7E6D	繭	⿱艹&CDP-8DDC;[GTK]	⿱艹&CDP-8DDC;[J]",
    )
    .replace("U+43CD	䏍	⿱厶⺼[T]	⿱厶月[K]", "U+43CD	䏍	⿱厶⺼[T]	⿱厶月[KJ]")
    .replace("U+8983	覃	⿱覀早[GTK]	⿱襾早[J]", "U+8983	覃	⿱覀早[GTKJ]	⿱襾早")
    .replace("U+FA42	既	既", "U+FA42	既	⿰&GWS-U7680-08-VAR-001;旡")
    .replace("U+23942	𣥂	𣥂", "U+23942	𣥂	⿱⿰丶亅丿")
    .replace("U+5019	候	⿰&CDP-8B7A;&CDP-8BC7;", "U+5019	候	⿴侯丨")
    .replace("U+2053C	𠔼	⿵冂一", "U+2053C	𠔼	⿵冂丶")
    .replace(
      new RegExp(
        `(${Object.keys(FORCE_MEANINGLESS_REPLACEMENTS).join("|")})`,
        "gu",
      ),
      (_, match) => {
        if (match in FORCE_MEANINGLESS_REPLACEMENTS) {
          return FORCE_MEANINGLESS_REPLACEMENTS[
            match as unknown as keyof typeof FORCE_MEANINGLESS_REPLACEMENTS
          ];
        }
        throw new Error(_ + "    " + match);
      },
    )
    .replace(
      "CDP-8BB5	&CDP-8BB5;	⿰&CDP-88F0;犬	⿰&CDP-8B5E;犬",
      "CDP-8BB5	&CDP-8BB5;	⿰&CDP-88F0;犬	⿰&CDP-8B5E;犬[J]",
    )
    .replace(
      "CDP-8BC3	&CDP-8BC3;	⿱&CDP-88F0;寸	⿱&CDP-8B5E;寸",
      "CDP-8BC3	&CDP-8BC3;	⿱&CDP-88F0;寸	⿱&CDP-8B5E;寸[J]",
    )
    .replace(
      "CDP-8C4F	&CDP-8C4F;	⿰&CDP-88F0;&CDP-8C4E;	⿰&CDP-8B5E;&CDP-8C4E;",
      "CDP-8C4F	&CDP-8C4F;	⿰&CDP-88F0;&CDP-8C4E;	⿰&CDP-8B5E;&CDP-8C4E;[J]",
    )
    .replace("U+5F37	強	⿰弓𧈧", "U+5F37	強	⿸弘虫")
    .replace(
      "U+7962	祢	⿰礻尔[GTJ]	⿰示尔[K]",
      "U+7962	祢	⿰礻尔[GT]	⿰示尔[K]	⿰礻尓[J]",
    )
    .replace("U+6447	摇	⿰扌䍃", "U+6447	摇	⿰扌&GWS-U4343-VAR-001;")
    .replace("U+7476	瑶	⿰王䍃", "U+7476	瑶	⿰王&GWS-U4343-VAR-001;")
    .replace(/⿰王/ug, "⿰𤣩")
    .replace(/⿱人/g, "⿱𠆢")
    .replace("U+961D	阝	阝", "U+2ED6	⻖	⻖\nU+2ECF	⻏	⻏")
    .replace(/⿰阝/g, "⿰⻖")
    .replace(/阝/g, "⻏")
    .replace("U+6740	杀	⿱㐅朩", "U+6740	杀	⿱㐅朩[G]	⿱㐅木[J]")
    .replace("U+6742	杂	⿱九朩", "U+6742	杂	⿱九朩[G]	⿱九木[J]")
    .replace("U+8853	術	⿲彳术亍[G]	⿲彳朮亍[TJKV]", "U+8853	術	⿴行术[GJ]	⿴行朮[TKV]") //朮术術
    .replace("U+8FF0	述	⿺辶术[GJ]	⿺辶朮[TKV]", "U+8FF0	述	⿺辶术[G]	⿺辶朮[TKV]")
    .replace("U+548E	咎	⿱处口", "U+548E	咎	⿱⿺夂人口")
    .replace("U+6372	捲	⿰扌卷[GTKV]	⿰扌巻[J]", "U+6372	捲	⿰扌卷")
    .replace("U+5026	倦	⿰亻卷[GTKV]	⿰亻巻[J]", "U+5026	倦	⿰亻卷")
    .replace("U+9BD6	鯖	⿰魚青[GTJ]	⿰魚靑[K]", "U+9BD6	鯖	⿰魚青[GT]	⿰魚靑[KJ]")
    .replace("U+9306	錆	⿰金青[GTJV]	⿰金靑[K]", "U+9306	錆	⿰金青[GTV]	⿰金靑[KJ]")
    .replace(/⿱爫夫/g, "&GWS-U595A-ITAIJI-001;")
    .replace(/⿱十𭾱/g, "&GWS-U8931-ITAIJI-004;")
    .replace(/⿱日匂/g, "&GWS-U66F7-VAR-005;")
    .replace(/⿱爫𠙻/g, "&GWS-U4343-VAR-001;")
    .replace(/⿱𠂊旧/g, "&GWS-U2FF1-U2008A-U65E7;")
    .replace("U+6108	愈	⿱俞心[GTJV]	⿱兪心[K]", "U+6108	愈	⿱兪心[K]")
    // .replace(//g, '㡭') // no glyphwiki glyph for simplified version of 㡭

    .replace(/⿱彐𧰨/ug, "&GWS-U5F56-ITAIJI-001;")
    .concat("GWS-U5F56-ITAIJI-001	&GWS-U5F56-ITAIJI-001;	⿱彐𧰨\n")
    .replace(/⿳十罒心/g, "⿱&GWS-FITZGERALD_JUR133;心")
    .replace(/⿱&GWS-FITZGERALD_JUR133;心/g, "&GWS-U226F3-VAR-001;")
    .concat("GWS-FITZGERALD_JUR133	&GWS-FITZGERALD_JUR133;	⿱十��\n")
    .concat(
      "GWS-U226F3-VAR-001	&GWS-U226F3-VAR-001;	⿱&GWS-FITZGERALD_JUR133;心\n",
    )
    .replace(/⿱𭕄凶/g, "&GWS-U2FF1-U2D544-U51F6;")
    .replace(
      "U+5DE4	巤	⿳巛龱&CDP-8D46;[GJK]	⿳巛囚&CDP-8D46;[T]",
      "U+5DE4	巤	⿱&GWS-U2FF1-U5DDB-U9FB1;&CDP-8D46;",
    )
    .concat("GWS-U2FF1-U2D544-U51F6	&GWS-U2FF1-U2D544-U51F6;	⿱𭕄凶\n") // simplified component form of  𡿺
    .concat("GWS-U2FF1-U5DDB-U9FB1	&GWS-U2FF1-U5DDB-U9FB1;	⿱巛龱\n")
    .replace(/\S+\s+榺.+/u, "U+69BA	榺	⿸&GWS-U6715-05-VAR-001;木")
    .replace(/\S+\s+塍.+/u, "U+584D	塍	⿸&GWS-U6715-05-VAR-001;土")
    .replace(/\S+\s+謄.+/u, "U+8B04	謄	⿸&GWS-U6715-05;言")
    .replace(/\S+\s+賸.+/u, "U+8CF8	賸	⿸&GWS-U6715-05-VAR-001;貝")
    .replace(/\S+\s+黱.+/u, "U+9EF1	黱	⿸&GWS-U6715-05;黑")
    .replace(/\S+\s+勝.+/u, "U+52DD	勝	⿸&GWS-U6715-05;力")
    .replace(/\S+\s+滕.+/u, "U+6ED5	滕	⿸&GWS-U6715-05-VAR-001;水")
    // .replace(/\S+\s+幐.+/u, 'U+5E50	幐	⿸朕帣')
    .replace(/\S+\s+縢.+/u, "U+7E22	縢	⿸&GWS-U6715-05-VAR-001;糸")
    .replace(/\S+\s+騰.+/u, "U+9A30	騰	⿸&GWS-U6715-05;馬")
    .replace(/\S+\s+螣.+/u, "U+87A3	螣	⿸&GWS-U6715-05-VAR-001;虫")
    .concat("GWS-U6715-05	&GWS-U6715-05;	⿰月龹\n")
    .concat("GWS-U6715-05-VAR-001	&GWS-U6715-05-VAR-001;	⿰月𠔉\n")
    // ⿸㫃
    .replace(/\S+\s+旃.+/u, "U+65C3	旃	⿸&GWS-U3AC3-05;丹")
    .replace(/\S+\s+施.+/u, "U+65BD	施	⿸&GWS-U3AC3-05;也")
    .replace(/\S+\s+㫍.+/u, "U+3ACD	㫍	⿸&GWS-U3AC3-05;攸")
    .replace(/\S+\s+旞.+/u, "U+65DE	旞	⿸&GWS-U3AC3-05;遂")
    .replace(/\S+\s+旐.+/u, "U+65D0	旐	⿸&GWS-U3AC3-05;兆")
    .replace(/\S+\s+旖.+/u, "U+65D6	旖	⿸&GWS-U3AC3-05;奇")
    .replace(/\S+\s+㫏.+/u, "U+3ACF	㫏	⿸&GWS-U3AC3-05;要")
    .replace(/\S+\s+旒.+/u, "U+65D2	旒	⿸&GWS-U3AC3-05;㐬")
    .replace(/\S+\s+斿.+/u, "U+65BF	斿	⿸&GWS-U3AC3-05;子")
    .replace(/\S+\s+旆.+/u, "U+65C6	旆	⿸&GWS-U3AC3-05;巿")
    .replace(/\S+\s+旂.+/u, "U+65C2	旂	⿸&GWS-U3AC3-05;斤")
    .replace(/\S+\s+𣃘.+/u, "U+230D8	𣃘	⿸&GWS-U3AC3-05;丨")
    .replace(/\S+\s+旅.+/u, "U+65C5	旅	⿸&GWS-U3AC3-05;&CDP-8C66;")
    .replace(/\S+\s+旋.+/u, "U+65CB	旋	⿸&GWS-U3AC3-05;疋")
    .replace(/\S+\s+族.+/u, "U+65CF	族	⿸&GWS-U3AC3-05;矢")
    .replace(/\S+\s+旜.+/u, "U+65DC	旜	⿸&GWS-U3AC3-05;亶")
    .replace(/\S+\s+旝.+/u, "U+65DD	旝	⿸&GWS-U3AC3-05;會")
    .replace(/\S+\s+旄.+/u, "U+65C4	旄	⿸&GWS-U3AC3-05;毛")
    .replace(/\S+\s+𣄪.+/u, "U+2312A	𣄪	⿸&GWS-U3AC3-05;𤐫")
    .replace(/\S+\s+旇.+/u, "U+65C7	旇	⿸&GWS-U3AC3-05;皮")
    .replace(/\S+\s+𣄠.+/u, "U+23120	𣄠	⿸&GWS-U3AC3-05;猋")
    .replace(/\S+\s+旌.+/u, "U+65CC	旌	⿸&GWS-U3AC3-05;生")
    .replace(/\S+\s+旗.+/u, "U+65D7	旗	⿸&GWS-U3AC3-05;其")
    .replace(/\S+\s+旟.+/u, "U+65DF	旟	⿸&GWS-U3AC3-05;與")
    .replace(/\S+\s+旛.+/u, "U+65DB	旛	⿸&GWS-U3AC3-05;番")
    .concat("GWS-U3AC3-05	&GWS-U3AC3-05;	⿰方𠂉\n")
    // ['嚢', '囊'],, 'GWS-U2FF3-U5405-U2000E-U27607', 'GWS-JUSTINSILVESTRE_U342E-BOTTOM'],

    // .replace(/⿳吅𠀎𧘇/ug, '&GWS-U2FF3-U5405-U2000E-U27607;')
    .replace(/⿱&CDP-8CA3;𧘇/ug, "&GWS-U2FF3-U5405-U2000E-U27607;")
    .replace(/⿳(.)&CDP-8CA3;𧘇/ug, "⿱$1&GWS-U2FF3-U5405-U2000E-U27607;")
    .replace(/⿳八𠀎𧘇/ug, "&GWS-JUSTINSILVESTRE_U342E-BOTTOM;")
    .replace(/⿳六𠀎𧘇/ug, "⿱亠&GWS-JUSTINSILVESTRE_U342E-BOTTOM;")
    .replace(
      "U+56CA	囊	⿳&CDP-8DDD;冖⿱&CDP-8CA3;𧘇",
      "U+56CA	囊	⿳&CDP-8DDD;冖&GWS-U2FF3-U5405-U2000E-U27607;",
    )
    .replace(
      "U+56A2	嚢	⿳&CDP-8DDD;冖⿳八𠀎𧘇",
      "U+56A2	嚢	⿳&CDP-8DDD;冖&GWS-JUSTINSILVESTRE_U342E-BOTTOM;",
    )
    .concat(
      "GWS-JUSTINSILVESTRE_U342E-BOTTOM	&GWS-JUSTINSILVESTRE_U342E-BOTTOM;	⿳八𠀎𧘇\n",
    )
    .concat(
      "GWS-U2FF3-U5405-U2000E-U27607	&GWS-U2FF3-U5405-U2000E-U27607;	⿱&CDP-8CA3;𧘇\n",
    )
    .replace(
      "U+5FAE	微	⿰彳𢼸[GK]	⿰彳𣁋[TJV]",
      "U+5FAE	微	⿵&GWS-U5FAE-05-VAR-002;儿",
    )
    .replace(/\S+\s+徵.+/u, "U+5FB5	徵	⿵&GWS-U5FAE-05-VAR-002;壬")
    .replace(/\S+\s+幑.+/u, "U+5E51	幑	⿵&GWS-U5FAE-05-VAR-002;巾")
    .replace(/\S+\s+徽.+/u, "U+5FBD	徽	⿵&GWS-U5FAE-05-VAR-002;糸")
    .replace(/\S+\s+黴.+/u, "U+9EF4	黴	⿵&GWS-U5FAE-05-VAR-002;黑")
    .replace(/\S+\s+徴.+/u, "U+5FB5	徴	⿵&GWS-U5FAE-05-VAR-001;王")
    .concat("GWS-U5FAE-05-VAR-001	&GWS-U5FAE-05-VAR-001;	⿲彳山攵\n")
    .concat("GWS-U5FAE-05-VAR-002	&GWS-U5FAE-05-VAR-002;	⿲彳⿱山一攵\n")
    .replace(/\S+\s+衙.+/u, "U+8859	衙	⿴行吾")
    .replace(/\S+\s+𧗳.+/u, "U+275F3	𧗳	⿴行言")
    .replace(/\S+\s+銜.+/u, "U+929C	銜	⿴行金")
    .replace(/\S+\s+衕.+/u, "U+8855	衕	⿴行同")
    .replace(/\S+\s+街.+/u, "U+8857	街	⿴行圭")
    .replace(/\S+\s+衎.+/u, "U+884E	衎	⿴行干")
    .replace(/\S+\s+𧗸.+/u, "U+275F8	𧗸	⿴行戔")
    .replace(/\S+\s+𧘂.+/u, "U+27602	𧘂	⿴行童")
    .replace(/\S+\s+衒.+/u, "U+8852	衒	⿴行玄")
    .replace(/\S+\s+𧗿.+/u, "U+275FF	𧗿	⿴行率")
    .replace(/\S+\s+衢.+/u, "U+8862	衢	⿴行瞿")
    .replace(/\S+\s+衍.+/u, "U+884D	衍	⿴行氵")
    .replace(/\S+\s+衡.+/u, "U+8861	衡	⿴行𩵋")
    .replace(/\S+\s+䘙.+/u, "U+4619	䘙	⿴行⿱韋帀")
    .replace(/\S+\s+䡓.+/u, "U+4853	䡓	⿴行車")
    .replace(/\S+\s+鵆.+/u, "U+9D46	鵆	⿴行鳥")
    .replace(/\S+\s+修.+/g, "U+4FEE	修	⿸攸彡")
    .replace(/\S+\s+倏.+/g, "U+500F	倏	⿸攸犬")
    .replace(/\S+\s+儵.+/g, "U+5135	儵	⿸攸黑")
    .replace(/\S+\s+條.+/g, "U+689D	條	⿸攸木")
    .replace(/\S+\s+絛.+/g, "U+7D5B	絛	⿸攸糸")
    .replace(/\S+\s+脩.+/g, "U+8129	脩	⿸攸月")
    .replace(/\S+\s+鯈.+/g, "U+9BC8	鯈	⿸攸魚")
    .replace("U+73ED	班	⿲王&CDP-8BEA;王", "U+73ED	班	⿲王&CDP-8968;王")
    // 㥯𤔌𪺍𢚩
    .replace("U+2AE8D	𪺍	⿱爫&CDP-8BAB;", "U+2AE8D	𪺍	⿱爫彐")
    .replace(
      "U+2450C	𤔌	⿳爫工彐[G]	⿳爫工&CDP-8BAB;[T]",
      "U+2450C	𤔌	⿳爫工彐[G]	⿳爫工&CDP-8BAB;[TJ]",
    )
    .replace("U+20B36	𠬶	⿳&CDP-8BAB;冖又", "U+20B36	𠬶	⿳彐冖又")
    .replace(
      /([浸侵寝])	⿰(.)𠬶/ug,
      (m, char, component) => `${char}	⿰${component}&GWS-U20B36-VAR-002;`,
    )
    .replace("U+5BDD	寝	⿱宀⿰丬𠬶", "U+5BDD	寝	⿱宀⿰丬&GWS-U20B36-VAR-002;")
    .concat("GWS-U20B36-VAR-002	&GWS-U20B36-VAR-002;	⿳彐冖又\n")
    .replace("CDP-8DBA	&CDP-8DBA;	⿻⿱禾丂③", "CDP-8DBA	&CDP-8DBA;	⿻⿱禾丂戈")
    .replace("U+2F82F	即	⿰⑥卩", "U+2F82F	即	⿰&GWS-CDP-8B7C-VAR-001;卩")
    .replace(
      "U+9115	鄕	⿲乡皀⻏[GTKV]	⿲乡⑦⻏[J]",
      "U+9115	鄕	⿲乡皀⻏[GTKV]	⿲乡&GWS-U7680-08-VAR-001;⻏[J]",
    ) // careful for oozato
    .replace(
      "U+537F	卿	⿲𠂎&CDP-8B7C;卩[GTJV]	⿲𠂎⑦卩[K]	⿲𠂎⑥卩[O]",
      "U+537F	卿	⿻卯&GWS-U7680-08-VAR-001;",
    )
    .concat(
      "GWS-U7680-08-VAR-001	&GWS-U7680-08-VAR-001;	⿱丨&GWS-CDP-8B7C-VAR-001;\n",
    )
    .replace(
      "CDP-8C42	&CDP-8C42;	⿱丶&CDP-8B7C;	⿱丨&CDP-8B7C;",
      "CDP-8C42	&CDP-8C42;	⿱丶&CDP-8B7C;	⿱丨&CDP-8B7C;[J]",
    ) // common left variant of 良
    .replace("U+2967F	𩙿	𩙿", "U+2967F	𩙿	⿱亼&GWS-CDP-8B7C-VAR-001;")
    .replace("U+4E26	並	⿱䒑业	⿱丷亚", "U+4E26	並	⿱丷亚")

    .concat("GWS-U20B36-VAR-002	&GWS-U20B36-VAR-002;	⿳彐冖又\n")

    .replace(
      "CDP-8DE3	&CDP-8DE3;	⿻王丷	⿱一&CDP-8A65;",
      "CDP-8DE3	&CDP-8DE3;	⿱一&CDP-8A65;",
    ) // kane bottom
    .replace("CDP-8BBD	&CDP-8BBD;	⿱业𦍌	⿱丵一", "CDP-8BBD	&CDP-8BBD;	⿱业𦍌")
    .replace("U+91CC	里	⿱&CDP-8BD9;一	⿻甲二", "U+91CC	里	⿱田土")
    .replace(
      "CDP-88D4	&CDP-88D4;	&CDP-88D4;",
      "CDP-88D4	&CDP-88D4;	⿱&CDP-8B62;土",
    )
    .replace("U+66FD	曽	⿱𬎿日", "U+66FD	曽	⿱丷𭥫")
    .replace(
      "U+5009	倉	⿱亽⿸&CDP-89CE;口[G]	⿱亼⿸&CDP-89CE;口[TJK]",
      "U+5009	倉	⿸&GWS-JUSTINSILVESTRE_U5009-TOP;口",
    )
    .concat(
      "GWS-JUSTINSILVESTRE_U5009-TOP	&GWS-JUSTINSILVESTRE_U5009-TOP;	⿱亼&CDP-89CE;\n",
    )
    .replace("U+8AFA	諺	⿰言彦[GJ]	⿰言彥[TKV]", "U+8AFA	諺	⿰言彦[G]	⿰言彥[TKVJ]")
    // todo: maybe 臨 with wrapping wo4
    // 塩 (simplified from 鹽) with right half as variant of 監

    .replace("U+5E74	年	年", "U+5E74	年	⿱𠂉㐄")
    .replace("U+66F0	曰	曰", "U+66F0	曰	⿴口一")
    .replace("U+767D	白	白", "U+767D	白	⿱丿日")
    .replace("U+4E8B	事	事", "U+4E8B	事	⿻⿳一口&CDP-8BAB;亅")
    .replace("U+627F	承	承", "U+627F	承	⿱乛⿻水三")
    .replace("U+6C38	永	永", "U+6C38	永	⿱丶⿻乛水")
    .replace("U+7F36	缶	缶", "U+7F36	缶	⿻午山")
    .replace("U+758B	疋	疋", "U+758B	疋	⿱乛龰")
    .replace("U+758C	疌	疌", "U+758C	疌	⿻⿱一彐龰")
    .replace("U+6771	東	東", "U+6771	東	⿻木日")
    .replace("U+67EC	柬	柬", "U+67EC	柬	⿻束丷")
    .replace("U+672A	未	未", "U+672A	未	⿻一木")
    .replace("U+672B	末	末", "U+672B	末	⿻一木")
    .replace("U+672C	本	本", "U+672C	本	⿻木一")
    .replace("U+6731	朱	朱", "U+6731	朱	⿻𠂉木")
    .replace("U+675F	束	束", "U+675F	束	⿻木口")
    .replace("U+673F	朿	朿", "U+673F	朿	⿻木冂")
    .replace("U+8C46	豆	豆", "U+8C46	豆	⿳一口䒑")
    .replace("U+66F3	曳	曳", "U+66F3	曳	⿻⿻日乚丿")
    .replace("U+5C22	尢	尢", "U+5C22	尢	⿻一儿")
    .replace("U+91CD	重	重", "U+91CD	重	⿱千里")
    .replace("CDP-8C4B	&CDP-8C4B;	&CDP-8C4B;", "CDP-8C4B	&CDP-8C4B;	⿻廿儿")
    .replace("U+98DB	飛	飛", "U+98DB	飛	⿹⿰乙⺀⿻升⿰乙⺀")
    .replace("U+9149	酉	酉", "U+9149	酉	⿻西一")
    .replace("U+718F	熏	熏", "U+718F	熏	⿱千黑")
    .replace("U+5DF2	已	已", "U+5DF2	已	⿻己丨")
    .replace(
      "CDP-89B0	&CDP-89B0;	&CDP-89B0;",
      "CDP-89B0	&CDP-89B0;	⿻⿱&CDP-8BBF;己三",
    ) // 龍 right
    .replace("U+3406	㐆	㐆", "U+3406	㐆	⿳丿&CDP-89CE;&CDP-8B6C;")
    .replace("CDP-89CE	&CDP-89CE;	⿴尸一", "CDP-89CE\t&CDP-89CE;\t&CDP-89CE;")
    .replace("U+81E3	臣	臣", "U+81E3	臣	⿻巨⿱丨丨")
    .replace("U+7C9B	粛	粛", "U+7C9B	粛	⿻⿻肀米&CDP-8BF5;")
    .replace("U+8085	肅	肅", "U+8085	肅	⿻肀𣶒")
    .replace("U+79B9	禹	禹", "U+79B9	禹	⿱丿⿻虫冂")
    .replace("CDP-89B9	&CDP-89B9;	&CDP-89B9;", "CDP-89B9	&CDP-89B9;	⿻口儿")
    .replace("U+5198	冘	冘", "U+5198	冘	⿻冖儿")
    .replace("U+6209	戉	戉", "U+6209	戉	⿻𠄌戊")
    .replace("CDP-87C5	&CDP-87C5;	&CDP-87C5;", "CDP-87C5	&CDP-87C5;	⿻甲龷")
    .replace("U+7533	申	申", "U+7533	申	⿱丨甲")
    .replace("U+8C37	谷	谷", "U+8C37	谷	⿳八𠆢口")
    .replace("U+5BF8	寸	寸", "U+5BF8	寸	⿹𬺰丶")
    .replace("U+624D	才	才", "U+624D	才	⿻𬺰丿")
    .replace("U+5DF4	巴	巴", "U+5DF4	巴	⿻巳丨")
    .replace("U+53F2	史	史", "U+53F2	史	⿻口乂")
    .replace("U+4E08	丈	丈", "U+4E08	丈	⿱十乂")
    .replace("U+4E45	久	久", "U+4E45	久	⿱𠂊人")
    .replace("U+96B6	隶	隶", "U+96B6	隶	⿱肀氺")
    .replace("U+7518	甘	甘", "U+7518	甘	⿻廿一")
    .replace("U+5EFF	廿	廿", "U+5EFF	廿	⿻⿰十十一")
    .replace("U+9769	革	革", "U+9769	革	⿱廿⿻口十")
    .replace("CDP-89C5	&CDP-89C5;	&CDP-89C5;", "CDP-89C5	&CDP-89C5;	⿻⿻口十口")
    .replace("U+30E6	ユ	ユ", "U+30E6	ユ	⿱𠃍一")
    .replace("U+4EE5	以	以", "U+4EE5	以	⿲𠄌丶人")
    .concat("U+2010C	𠄌	𠄌\n")

    .replace("U+7199	熙	⿱巸灬", "U+7199	熙	⿱&GWS-U5DF8-G;灬")
    .concat("GWS-U5DF8-G	&GWS-U5DF8-G;	⿰𦣞巳\n")
    .replace("U+5794	垔	⿱覀土[G]	⿱西土[TJK]", "U+5794	垔	⿱覀土")
    .replace(
      "U+516A	兪	⿱亼⿰月巜[GT]	⿱𠓛⿰⿵⺆⺀巜[JK]",
      "U+516A	兪	⿱亼⿰月巜[GT]	⿱𠓛⿰⺼巜[JK]",
    )
    .replace("CDP-8CEC	&CDP-8CEC;	⿱龷⺼", "CDP-8CEC	&CDP-8CEC;	⿱龷月")
    .replace("U+7528	用	⿵冂&CDP-8BF1;", "U+7528	用	⿵⺆&CDP-8BF1;")
    .replace("U+81FF	臿	⿻千臼[GK]	⿻干臼[TJ]", "U+81FF	臿	⿻千臼")
    .replace("U+591C	夜	⿱亠⿰亻&CDP-89F3;", "U+591C	夜	⿱亠⿰亻⿻夕乀")
    .replace("U+2C3BE	𬎾	⿻肀月	⿻聿冂", "U+2C3BE	𬎾	⿻肀用")
    .replace("U+34B8	㒸	⿱丷豕	⿱八豕[X]", "U+34B8	㒸	⿱䒑𧰨")

    .replace(
      "CDP-8BF8	&CDP-8BF8;	&CDP-8BF8;",
      "CDP-8BF8	&CDP-8BF8;	⿱&CDP-876E;十",
    )
    .replace("U+4E57	乗	乗", "U+4E57	乗	⿻禾&CDP-876E;")
    .replace("U+5782	垂	⿳丿&CDP-876E;一", "U+5782	垂	⿻壬&CDP-876E;")
    .replace("U+83EF	華	⿱艹&CDP-8BF8;", "U+83EF	華	⿱艹&CDP-8BF8;")
    .replace("U+9801	頁	頁", "U+9801	頁	⿱𦣻八")
    .replace(
      "U+58FA	壺	⿱士&CDP-8DE8;",
      "U+58FA	壺	⿱士&GWS-U2FF1-CDP-88A1-U4E00;",
    )
    .concat(
      "GWS-U2FF1-CDP-88A1-U4E00	&GWS-U2FF1-CDP-88A1-U4E00;	&GWS-U2FF1-CDP-88A1-U4E00;\n",
    )
    .replace("U+24D14	𤴔	𤴔", "U+24D14	𤴔	⿱乛止")
    .replace("U+72AC	犬	犬", "U+72AC	犬	⿻大丶")
    .replace("U+821F	舟	舟", "U+821F	舟	⿱丶⿻丹丨")

    .replace("U+20087	𠂇	𠂇", "U+20087	𠂇	⿻丿一")
    .replace(
      "U+8A0A	訊	⿰言卂[GT]	⿰言⿹⺄𠂇[JK]",
      "U+8A0A	訊	⿰言卂[GT]	⿰言&GWS-U5342-VAR-001;[JK]",
    )
    .concat("GWS-U5342-VAR-001	&GWS-U5342-VAR-001;	⿹⺄𠂇\n")
    .replace("U+5190	冐	⿱冃月[GJK]	⿱日月[T]", "U+5190	冐	⿱日月")
    .replace("U+5375	卵	⿰𠂑卪", "U+5375	卵	⿻卯丷")
    .replace("U+620A	戊	戊", "U+620A	戊	⿰厂戈")
    .replace("U+6211	我	我", "U+6211	我	⿰手戈")
    .replace("U+8D64	赤	⿱土&CDP-8CB5;", "U+8D64	赤	⿻一亦")
    .replace("U+4E90	亐	⿱一𠀁", "U+4E90	亐	⿻丂一")

    .replace("U+5E00	帀	⿱一巾", "")
    .replace(/帀/gu, "⿱一巾")
    .replace("U+5931	失	⿰丿夫", "U+5931	失	⿱矢丨")
    .replace(
      "CDP-8BC2	&CDP-8BC2;	⿹&CDP-8BBF;丿",
      "CDP-8BC2	&CDP-8BC2;	⿹&CDP-8BBF;丨",
    ) // 與 wrapper
    .replace("U+26222	𦈢	⿱𠂉⿻一&CDP-8960;	⿱𠂉⿻一止[X]", "U+26222	𦈢	⿱午止")
    .replace("U+5405	吅	⿰口口", "")
    .replace(/吅/gu, "⿰口口")
    .replace("CDP-8D4F	&CDP-8D4F;	⿱𠅃木", "CDP-8D4F	&CDP-8D4F;	⿻卒木") // combining stroke
    .replace("U+4EE4	令	⿱亽龴[G]	⿱亼龴[TV]	⿱亼&CDP-8A60;[JK]", "U+4EE4	令	⿱亽龴")
    .replace("U+45B5	䖵	⿰虫虫", "")
    .replace(/䖵/gu, "⿰虫虫")
    .replace("U+2C5CC	𬗌	⿰糹虫", "U+2C5CC	𬗌	⿰糸虫")
    .replace("U+7D72	絲	⿰糹糸[GTV]	⿰糸糸[JK]", "U+7D72	絲	⿰糸糸")
    .replace(
      "CDP-8D50	&CDP-8D50;	⿰臣&CDP-8D4E;",
      "CDP-8D50	&CDP-8D50;	⿸&CDP-8CC9;罒",
    )
    .replace("U+96DA	雚	⿱艹𨾴[GK]	⿱艹𨾴[TJ]", "U+96DA	雚	⿱艹𨾴")
    .replace("U+85A8	薨	⿱&CDP-8D60;死	⿳𦭝冖死", "U+85A8	薨	⿳𦭝冖死")

    // compatibility variant complications
    .replace("U+FA5B	者	者", "U+FA5B	者	⿻者丶")
    .replace("CDP-8BCB	&CDP-8BCB;	&CDP-8BCB;", "CDP-8BCB	&CDP-8BCB;	⿻口儿")
    .replace("CDP-8C7A	&CDP-8C7A;	&CDP-8C7A;", "CDP-8C7A	&CDP-8C7A;	⿱口⿰丨二")
    .replace("CDP-8D6B	&CDP-8D6B;	&CDP-8D6B;", "CDP-8D6B	&CDP-8D6B;	⿱丱一")
    .replace(
      "CDP-8CE4	&CDP-8CE4;	&CDP-8CE4;",
      "CDP-8CE4	&CDP-8CE4;	⿻⿱丿⿰丨二丶",
    )

    .replace("U+714E	煎	⿱前灬", "U+714E	煎	⿱&GWS-U524D-UE0101;灬")
    .replace("U+63C3	揃	⿰扌前", "U+63C3	揃	⿰扌&GWS-U524D-UE0101;")
    .replace("U+7BAD	箭	⿱竹前", "U+7BAD	箭	⿱竹&GWS-U524D-UE0101;")
    .concat("GWS-U5216-VAR-002	&GWS-U5216-VAR-002;	⿰⺼刂\n")
    .concat("GWS-U524D-UE0101	&GWS-U524D-UE0101;	⿱䒑&GWS-U5216-VAR-002;\n")
    .replace("U+8420	萠	⿱艹朋[G]	⿱艹⿰⿵⺆⺀⿵⺆⺀[J]", "U+8420	萠	⿱艹朋[G]	⿱艹⿰⺼⺼[J]")
    .replace(
      "U+6182	憂	⿱㥑夂[GJK]	⿱㥑夊[TV]",
      "U+6182	憂	⿱㥑夂[GK]	⿱㥑夊[TV]	⿱&CDP-8CD4;𢖻[J]",
    )
    .replace(
      "CDP-8CD4	&CDP-8CD4;	&CDP-8CD4;",
      "CDP-8CD4	&CDP-8CD4;	⿱&GWS-JUSTINSILVESTRE_U268FB-03-TOP;冖",
    )
    .concat(
      "GWS-JUSTINSILVESTRE_U268FB-03-TOP	&GWS-JUSTINSILVESTRE_U268FB-03-TOP;	&GWS-JUSTINSILVESTRE_U268FB-03-TOP;\n",
    )
    .replace(
      "U+7A93	窓	⿳穴厶心",
      "U+7A93	窓	⿱穴&GWS-JUSTINSILVESTRE_U5FE9-BOTTOM;",
    )
    .concat(
      "GWS-JUSTINSILVESTRE_U5FE9-BOTTOM	&GWS-JUSTINSILVESTRE_U5FE9-BOTTOM;	⿱厶心\n",
    )

    .replace(
      "U+5351	卑	⿱&CDP-89BE;十[GTK]	⿱丿𤰞[J]",
      "U+5351	卑	⿱&CDP-89BE;十[GTK]	⿱甶⿶十丿[J]",
    )
    .replace("U+24C1E	𤰞	⿱&CDP-8775;十	⿻甲𠃋	⿱田⿻𠃋丨	⿱田⿶十丿", "U+24C1E	𤰞	⿱田⿶十丿") // not even used in the end?
    .replace("U+FA35	卑	卑", "U+FA35	卑	⿱&CDP-89BE;十")
    .replace("U+724C	牌	⿰片卑", "U+724C	牌	⿰片卑")
    .replace("U+75FA	痺	⿸疒卑", "U+75FA	痺	⿸疒卑")
    .replace("U+7A17	稗	⿰禾卑", "U+7A17	稗	⿰禾卑")
    .replace("U+813E	脾	⿰月卑[GJK]	⿰⺼卑[TV]", "U+813E	脾	⿰月卑")
    .replace(/⿹𢦏业/ug, "&GWS-U97F1-VAR-001;")
    .concat("GWS-U97F1-VAR-001	&GWS-U97F1-VAR-001;	⿹𢦏业\n")
    .replace("U+9ED8	默	⿰黒犬	黒聲", "U+9ED8	默	⿰黑犬	黑聲")
    .replace("U+9ED9	黙	⿱⿰里犬灬[GJ]	⿱⿰&CDP-88D4;犬灬[T]", "U+9ED9	黙	⿺黒犬")
    .replace("U+52F2	勲	⿱動灬", "U+52F2	勲	⿺𤋱力")
    .replace("U+83EB	菫	⿳艹一&CDP-8A6D;", "U+83EB	菫	⿻𦰌一")
    .replace("U+71DF	營	⿱𤇾呂[G]	⿱𤇾吕[TJK]", "U+71DF	營	⿱𤇾呂")
    .replace("U+4E32	串	⿻吕丨	⿻中口", "U+4E32	串	⿻中口")


    .replace("U+634C	捌	⿰扌别", "U+634C	捌	⿰扌別")
    .replace("U+69EA	槪	⿰木旣[GT]	⿰木既[K]", "U+69EA	槪	⿰木既")
    .replace(/⿺𠃊米/ug, "&GWS-U2FFA-U200CA-U7C73;")
    .concat("GWS-U2FFA-U200CA-U7C73	&GWS-U2FFA-U200CA-U7C73;	⿺𠃊米\n")

    .replace("U+8ECA	車	車", "U+8ECA	車	⿻&CDP-8BF1;日")
    .replace(
      /(U\+\S+)	([曜躍濯擢燿])	⿰(扌)翟[^\n]*$/ug,
      (m, code, char, left) => `${code}	${char}	⿰${left}&GWS-U7FDF-UE0102;\n`,
    )
    .concat(
      "GWS-U7FDF-UE0102	&GWS-U7FDF-UE0102;	⿱&GWS-U2FF0-U2E95-U2E95-03;隹\n",
    ) // variant of 翟 used in common chars
    .concat("GWS-U2FF0-U2E95-U2E95-03	&GWS-U2FF0-U2E95-U2E95-03;	⿰彐彐\n") // variant of 羽
    .replace("U+3840	㡀	⿻丷⿻巾八[GT]	⿻八⿻巾八[JK]	⿱⺌⿵冂小[X]", "U+3840	㡀	⿱⺌⿵冂小")

    .replace("U+FA54	穀	⿰𥞤殳", "U+FA54	穀	⿹𣪊禾")
    .replace(
      "U+7A40	穀	⿰𥞤殳[GTK]	⿰⿳士冖禾殳[J]",
      "U+7A40	穀	⿹&GWS-U23A8A-VAR-001;禾",
    )
    .replace("U+6BBC	殼	⿰壳殳", "U+6BBC	殼	⿹𣪊几")
    .replace("U+6BBB	殻	⿰壳殳", "U+6BBB	殻	⿹&GWS-U23A8A-VAR-001;几")
    .concat("GWS-U23A8A-VAR-001	&GWS-U23A8A-VAR-001;	⿰⿱士冖殳\n") // variant of 𣪊
    // GWS-U23A8A-VAR-001
    // 穀	⿹𣪊禾

    .replace("U+777F	睿	⿳𣦵八𥃦", "U+777F	睿	⿱𣦵⿴谷二") // maybe should incorporate eye
    .replace("U+3561	㕡	⿰䜭又", "U+3561	㕡	⿹𣦻谷")
    .replace("U+53E1	叡	⿰睿又", "U+53E1	叡	⿹𣦻⿴谷二") // maybe should incorporate eye
    .replace("U+3562	㕢	⿰⿱𣦵貝又", "U+3562	㕢	⿹𣦻貝")
    .replace("U+49F9	䧹	⿸广倠", "U+49F9	䧹	⿱丿雁")
    .replace("U+29C0A	𩰊	𩰊", "U+29C0A	𩰊	⿰王亅")
    .replace("U+29C0B	𩰋	𩰋", "U+29C0B	𩰋	⿰王丨")
    .replace(
      "U+53DF	叟	⿱&CDP-884F;又[GJK]	⿱𦥔又[T]",
      "U+53DF	叟	⿱&CDP-884F;又[GK]	⿱𦥔又[JT]",
    )
    .replace("U+5E78	幸	⿱土𢆉", "U+5E78	幸	⿻一辛")
    .replace("U+6709	有	⿸𠂇月", "U+6709	有	⿸&GWS-U20087-11;月")
    .replace("U+53F3	右	⿸𠂇口", "U+53F3	右	⿸&GWS-U20087-11;口")
    .concat("GWS-U20087-11	&GWS-U20087-11;	⿻丿一\n") // reverse stroke order	𠂇
    .replace(/CDP-8CA9/ug, "GWS-CDP-8CA9-07")
    .concat(
      "GWS-U752B-03-VAR-001	&GWS-U752B-03-VAR-001;	⿻𤰔丶\n",
    ) // variant of 甫
    .concat("GWS-U66F7-VAR-005	&GWS-U66F7-VAR-005;	⿱日匂\n") // simplified component form of 曷   日匂
    .concat("GWS-U8931-ITAIJI-004	&GWS-U8931-ITAIJI-004;	⿱十𭾱\n") // simplified component form of 褱
    .concat("GWS-U2FF1-U2008A-U65E7	&GWS-U2FF1-U2008A-U65E7;	⿱𠂊旧\n") // simplified component form of  䍃   ⿱𠂊旧
    .concat("GWS-U595A-ITAIJI-001	&GWS-U595A-ITAIJI-001;	⿱爫夫\n") // simplified component form of 奚    ⿱爫夫
    .concat("GWS-U4343-VAR-001	&GWS-U4343-VAR-001;	⿱爫𠙻\n") // simplified component form of  䍃
    .concat(
      "GWS-CDP-8B7C-VAR-001	&GWS-CDP-8B7C-VAR-001;	&GWS-CDP-8B7C-VAR-001;\n",
    ) // 即
    .concat(
      "GWS-U5C03-VAR-001	&GWS-U5C03-VAR-001;	⿱&GWS-U752B-03-VAR-001;寸\n",
    ) //   // variant of 尃
    .concat("GWS-U6EA5-VAR-003	&GWS-U6EA5-VAR-003;	⿰氵&GWS-U5C03-VAR-001;\n") // variant of 溥
    .concat("GWS-U65C9-UE0102	&GWS-U65C9-UE0102;	⿱&GWS-U752B-03-VAR-001;方\n") // variant of 旉
    .replace(
      new RegExp(
        `(U\\+\\w+|[A-Z]{3,3}-.+)\\t(${
          forcedAtomicFigures.map((key) =>
            [...key].length === 1 ? key : `&${key};`
          ).join("|")
        })\\t.+`,
        "ug",
      ),
      "$1\t$2\t$2",
    )
    .replace(/⿳𭕄冖/gu, "⿱&GWS-U300EE;")
    .concat("GWS-U300EE	&GWS-U300EE;	⿱𭕄冖\n")
    .replace("⿱龸兄", "⿱𫩠儿")
    .replace("U+7531	由	由", "U+7531	由	⿻田丨")
    .replace("U+6765	来	来", "U+6765	来	⿻木䒑")
    // prevent blocking together 土 and 口
    .replace(
      "U+5468	周	⿵⺆𠮷[GTJV]	⿵⺆⿱&CDP-8BF1;口[K]",
      "U+5468	周	⿵⺆⿱土口[GTJV]	⿵⺆⿱&CDP-8BF1;口[K]",
    )
    .replace("U+820E	舎	⿱𠆢𠮷", "U+820E	舎	⿳𠆢土口")
    .replace("U+8881	袁	⿱𠮷𧘇", "U+8881	袁	⿳土口𧘇")
    .replace(/⿰氵⿱⿺𤰔丶寸/ug, "&GWS-U6EA5-VAR-003;")
    .replace(/⿱⿺𤰔丶寸/ug, "&GWS-U5C03-VAR-001;")
    .replace(/⿱⿺𤰔丶方/ug, "&GWS-U65C9-UE0102;")
    .replace("CDP-89ED	&CDP-89ED;	⿻&CDP-8BF1;冂", "CDP-89ED	&CDP-89ED;	⿻二巾")
    .replace("U+8870	衰	⿳亠&CDP-89EF;𧘇", "U+8870	衰	⿻哀一")
    // strange case: Japanese only has 卂 in standalone character.
    // so this might be more properly treated as a variant,
    // but since 巩 is so rare on its own, we're just
    // ignoring its standalone form analysis.
    .replace("U+5DE9	巩	⿰工凡[G]	⿰工卂[TJ]", "U+5DE9	巩	⿰工凡[GJ]	⿰工卂[T]")
    .execute();

export default patchKanjiDatabaseIdsText;
