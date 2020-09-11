-- goal: preserve final distinctions (except the iffier distinctions like "deng" medials)
--       while removing differences between allophone candidates (w and u for example)
--       and producing something relatively intuitive for english speakers,
--       that can usually be used to predict on'yomi, mandarin, and cantonese readings.
--       preferring diacritics over "non-english letters"

local initials = {
  [1] = "pp", -- p
  [2] = "p", -- pʰ
  [3] = "b", -- b
  [4] = "m", -- m
  [5] = "tt", -- t
  [6] = "t", -- tʰ
  [7] = "d", -- d
  [8] = "n", -- n
  [9] = "ttr", -- ȶ
  [10] = "tr", -- ȶʰ
  [11] = "dr", -- ȡ
  [12] = "n", -- n
  [13] = "tts", -- t͡s
  [14] = "ts", -- t͡sʰ
  [15] = "dz", -- d͡z
  [16] = "s", -- s
  [17] = "z", -- z
  [18] = "tch", -- t͡ʃ
  [19] = "ch", -- t͡ʃʰ
  [20] = "j", -- d͡ʒ
  [21] = "sh", -- ʃ
  [22] = "j", -- ʒ
  [23] = "tchy", -- t͡ɕ
  [24] = "chy", -- t͡ɕʰ
  [25] = "jy", -- ʑ
  [26] = "sy", -- ɕ
  [27] = "jy", -- d͡ʑ
  [28] = "kk", -- k
  [29] = "k", -- kʰ
  [30] = "g", -- ɡ
  [31] = "ng", -- ŋ
  [32] = "kh", -- x
  [33] = "gh", -- ɣ
  [34] = "", -- ""
  [35] = "gh", -- ɣ
  [36] = "y", -- j
  [37] = "l", -- l
  [38] = "nj" -- ȵʑ
}


local finals_with_rendundant_third_deng_mark_after_y = {
  ["ung"] = true,
  ["ûng"] = true,
  ["âng"] = true,
  ["uk"] = true,
  ["ûk"] = true,
  ["âk"] = true,
  ["u"] = true,
  ["ei"] = true, -- obscure reading of 栘 zyei is only exception
  ["en"] = true,
  ["et"] = true,
  ["a"] = true,
  ["ang"] = true,
  ["ak"] = true,
  ["ong"] = true,
  ["ok"] = true,
  ["ou"] = true,
  ["em"] = true,
  ["ep"] = true,
  ["eu"] = true,
  ["î"] = true,
  ["i"] = true,
  ["am"] = true,
  ["ap"] = true,
  ["an"] = true,
  ["at"] = true,
  ["eng"] = true,
  ["ek"] = true,
}

local finals = {
  -- 通攝
    --- 東	1董	1送	1屋
  [1] = "ung", -- uŋ
  [2] = "ung", -- ĭuŋ
  [3] = "uk", -- uk̚
  [4] = "uk", -- ĭuk̚
    --- 冬	2腫	2宋	2沃
  [5] = "ûng", -- uoŋ
  [6] = "ûk", -- uok̚
  [7] = "ûng", -- ĭwoŋ
  [8] = "ûk", -- ĭwok̚

  -- 江攝
    --- 	3江	3講	3絳	3覺
  [9] = "âng", -- ɔŋ   -- R
  [10] = "âk", -- ɔk̚   -- R

  -- 止攝
    --- 4支	4紙	4寘
  [11] = "i", -- ǐe     B  iii 卑 = no J in pulleyblank, je in baxter
  [12] = "i", -- ǐwe
  [13] = "i", -- ǐe     A  iv 碑  = J in pulleyblank, jie in baxter
  [14] = "i", -- ǐwe
  [15] = "i", -- i   -- never with R
  [16] = "i", -- wi  -- never with R
  [17] = "i", -- i     
  [18] = "i", -- wi     
  [19] = "i", -- ĭə
    -- 5微	5尾	5未
  [20] = "î", -- ĭəi
  [21] = "î", -- ĭwəi
 
  -- 遇攝
    --- 6魚	6語	6御
    -- ru u iu? except riu is in the third deng, so that would introduce
    -- inconsistency in representing the third deng with i.
  [22] = "o", -- ĭo  -- could take R as part of final notation
    --- 7虞	7麌	7遇
  [23] = "u", -- u   -- never with R
  [24] = "u", -- ĭu  -- never with R

  -- 蟹攝
    --- 9泰
  [25] = "ai", -- ɑi
  [26] = "ai", -- uɑi
    --- 10灰	10賄	11隊 -- MORE BELOW
  [27] = "oi", -- ĭɐi
  [28] = "oi", -- ĭwɐi
    --- 9佳	9蟹	10卦
  [29] = "ai", -- æi   -- R
  [30] = "ai", -- wæi   -- R
  [31] = "e", -- ai   -- R
  [32] = "e", -- wai   -- R
  [33] = "ai", -- ɐi   -- R
  [34] = "ai", -- wɐi   -- R
    --- 8齊	8薺	8霽
  [35] = "ei", -- ĭɛi
  [36] = "ei", -- ĭwɛi
  [37] = "ei", -- ĭɛi
  [38] = "ei", -- ĭwɛi
  [39] = "ei", -- iei
  [40] = "ei", -- iwei
    --- 10灰	10賄	11隊 -- CONTINUED FROM ABOVE
  [41] = "oi", -- ɒi
  [42] = "oi", -- uɒi

  -- 臻攝
    --- 11眞	11軫	12震	4質
  [43] = "in", -- ĭĕn
  [44] = "in", -- ǐĕn
  [45] = "in", -- ǐĕn
  [46] = "in", -- ĭen
  [47] = "in", -- ĭuĕn
  [48] = "it", -- ĭĕt̚
  [49] = "it", -- ĭĕt̚
  [50] = "it", -- ĭĕt̚
  [51] = "it", -- ĭet̚
  [52] = "it", -- ĭuĕt̚
    --- 13元	13阮	14願	6月 -- MORE BELOW
  [53] = "on", -- ən
  [54] = "ot", -- ət̚
  [55] = "on", -- uən
  [56] = "ot", -- uət̚
    --- 12文	12吻	13問	5物
  [57] = "on", -- ĭən
  [58] = "ot", -- ĭət̚
  [59] = "un", -- ĭuən
  [60] = "ut", -- ĭuət̚

  -- 山攝
    --- 14寒	14旱	15翰	7曷
  [61] = "an", -- ɑn   ---- CHANGE TO ax?
  [62] = "an", -- uɑn
  [63] = "at", -- ɑt̚     
  [64] = "at", -- uɑt̚
    --- 13元	13阮	14願	6月 -- CONTINUED FROM ABOVE
  [65] = "an", -- ĭɐn     
  [66] = "an", -- ĭwɐn
  [67] = "at", -- ĭɐt̚
  [68] = "at", -- ĭwɐt̚
    --- 15刪	15潸	16諌	8黠
  [69] = "an", -- an   -- R
  [70] = "an", -- wan   -- R
  [71] = "at", -- at̚   -- R
  [72] = "at", -- wat̚   -- R
  [73] = "an", -- æn   -- R
  [74] = "an", -- wæn   -- R
  [75] = "at", -- æt̚   -- R
  [76] = "at", -- wæt̚   -- R
    --- 1先	16銑	17霰	9屑
  [77] = "en", -- ĭɛn
  [78] = "en", -- ĭwɛn
  [79] = "en", -- ĭɛn
  [80] = "en", -- ĭwɛn
  [81] = "et", -- ĭɛt̚   --
  [82] = "et", -- ĭuɛt̚  --
  [83] = "et", -- ĭɛt̚   --
  [84] = "et", -- ĭuɛt̚  --
  [85] = "en", -- ien
  [86] = "en", -- iwen
  [87] = "et", -- iet̚
  [88] = "et", -- iwet̚

  -- 效攝
    --- 4豪	19皓	20號
  [89] = "au", -- ɑu
    --- 3肴	18巧	19效
  [90] = "au", -- au   -- R
    --- 2蕭	17篠	18嘯
  [91] = "eu", -- ĭɛu  --
  [92] = "eu", -- ĭɛu  --
  [93] = "eu", -- ieu
  
  -- 果攝
    --- 5歌	20哿	21箇
  [94] = "a", -- ɑ
  [95] = "a", -- uɑ
  [96] = "a", -- ǐɑ -- ONLY WITH VELAR STOPS
  [97] = "a", -- ĭuɑ
  
  -- 仮攝
    --- 6麻	21馬	22禡
  [98] = "a", -- a   -- R
  [99] = "a", -- wa   -- R
  [100] = "a", -- ĭa   --NEVER WITH VELAR STOPS

  -- 宕攝
    --- 7陽	22養	23漾	10薬
  [101] = "âng", -- ɑŋ
  [102] = "âng", -- uɑŋ
  [103] = "âk", -- ɑk̚
  [104] = "âk", -- uɑk̚
  [105] = "âng", -- ĭaŋ
  [106] = "âng", -- ĭwaŋ
  [107] = "âk", -- ĭak̚
  [108] = "âk", -- ĭak̚

    -- 梗攝
    --- 8庚	23梗	24敬	11陌
    [109] = "ang", -- ɐŋ   -- R
    [110] = "ang", -- wɐŋ   -- R
    [111] = "ang", -- ĭɐŋ   -- Y
    [112] = "ang", -- ĭwɐŋ   -- Y
    [113] = "ak", -- ɐk̚   -- R
    [114] = "ak", -- wɐk̚   -- R
    [115] = "ak", -- ĭɐk̚   -- Y
    [116] = "ak", -- ĭwɐk̚   -- Y
    [117] = "ang", -- æŋ   -- R
    [118] = "ang", -- wæŋ   -- R
    [119] = "ak", -- æk̚   -- R   -- would be nice to keep this as an A for hyaku/haku, but it's hard.
    [120] = "ak", -- wæk̚   -- R
    [121] = "eng", -- ĭɛŋ  -- Y
    [122] = "eng", -- ĭwɛŋ   -- Y
    [123] = "ek", -- ĭɛk̚   -- Y
    [124] = "ek", -- ĭwɛk̚   -- Y
      --- 9靑	24迥	25徑	12錫 -- is this data good? kawabata left obscure note.
    [125] = "eng", -- ieŋ
    [126] = "eng", -- iweŋ
    [127] = "ek", -- iek̚
    [128] = "ek", -- iwek̚
  
  -- 曾攝
    --- 10蒸 13職
  [129] = "ong", -- əŋ
  [130] = "ong", -- uəŋ   --- only with velars
  [131] = "ok", -- ək̚
  [132] = "ok", -- uək̚
  [133] = "ong", -- ĭəŋ
  [134] = "ok", -- ĭək̚
  [135] = "ok", -- ĭwək̚

  -- 流攝
    --- 11尤	25有	26宥
  [136] = "ou", -- ĭəu
  [137] = "ou", -- əu
  [138] = "ou", -- iəu
  
  -- 深攝
    --- 12侵	26寑	27沁	14緝
  [139] = "im", -- ĭĕm
  [140] = "im", -- ĭĕm
  [141] = "ip", -- ĭĕp̚
  [142] = "ip", -- ĭĕp̚
  
  -- 咸攝
    --- 	13覃	27感	28勘	15合 -- MORE BELOW
  [143] = "am", -- ɑm
  [144] = "ap", -- ɑp̚
    --- 15咸	29豏	30陥	17洽
  [145] = "am", -- ĭɐm   -- Y
  [146] = "am", -- ĭwɐm   -- Y
  [147] = "ap", -- ĭɐp̚   -- Y
  [148] = "ap", -- ĭwɐp̚   -- Y
  [149] = "am", -- am   -- R
  [150] = "ap", -- ap̚   -- R
  [151] = "am", -- ɐm   -- R
  [152] = "ap", -- ɐp̚   -- R
    --- 	14鹽	28琰	29豔	16葉
  [153] = "em", -- ĭɛm
  [154] = "em", -- ĭɛm
  [155] = "ep", -- ĭɛp̚
  [156] = "ep", -- ĭɛp̚
  [157] = "em", -- iem
  [158] = "ep", -- iep̚
    --- 	13覃	27感	28勘	15合 -- CONTINUED FROM ABOVE
  [159] = "am", -- ɒm 
  [160] = "ap", -- ɒp̚
}


local infer_categories_module = require("infer_categories")

local infer_categories = infer_categories_module.infer_categories
local initialConv = infer_categories_module.initialConv
local finalConv = infer_categories_module.finalConv


local always_round = { -- TODO: check
  -- ung ûng uk ûk o u
  [1] = true,
  [2] = true,
  [3] = true,
  [4] = true,
  [5] = true,
  [6] = true,
  [7] = true,
  [8] = true,
  [22] = true,
  [23] = true,
  [24] = true,
  -- râng râk"
  [9] = true,
  [10] = true,

  [59] = true, -- ĭuən
  [60] = true, -- ĭuət̚
}
local i_finals = {}
for id, final in pairs(finals) do
  local first_char = string.sub(final, 1, 1)
  if first_char == 'i' or first_char == 'î' then
    i_finals[id] = true
  end
end

local tones = {
  ["平"] = '0',
  ["入"] = '0',
  ["上"] = '↗',
  ["去"] = '↘',
  ["e"] = '', -- mistake in wiktionary data
}

local export = {}

local fricativisation_initial = {
	[1] = true,
	[2] = true,
	[3] = true,
}
-- \[(2|4|7|8|21|24|28|59|60|66|68|106|108|136|146|148)\]
local fricativisation_inducing = {
	[2] = true,
	[4] = true,
	[7] = true,
	[8] = true,
	[21] = true,
	[24] = true,
	[28] = true,
	[59] = true,
	[60] = true,
	[66] = true,
	[68] = true,
	[106] = true,
	[108] = true,
	[136] = true,
	[146] = true,
	[148] = true,
}


local m_lenition_inducing = {
	[21] = true,
	[24] = true,
	[59] = true,
	[60] = true,
	[66] = true,
	[68] = true,
	[106] = true,
	[146] = true,
}

local labial_fricatives = {
  ['p'] = 'ph',
  ['pp'] = 'f',
  ['b'] = 'v',
}


function export.getTranscription(pronunciation_raw)
local initial_id, final_id, tone_char, deng, openness = infer_categories(pronunciation_raw)
  
  local initialBase = initials[initial_id]
  local finalBase = finals[final_id]

  local rounded = openness == '合'

  local result = ''

  local initial
  local medial = ''
  local final = ''

  if fricativisation_inducing[final_id] and fricativisation_initial[initial_id] then
    initial = labial_fricatives[initialBase]
  elseif m_lenition_inducing[final_id] and initial_id == 4 then
    initial = "mv"
  else
    initial = initialBase

    if (deng == '三' and initialBase == 'gh') then
      initial = 'y'
    end

    if (deng == '二' 
    and not string.match(initial, 'r')
  ) then
      medial = medial .. 'r'
    end

    local yj_present = string.match(initial, 'y')
    local may_remove_i_or_umlaut_in_third_deng = finals_with_rendundant_third_deng_mark_after_y[finalBase]

    local final_has_i = i_finals[final_id]

    if (deng == '三' and not final_has_i) then
      local no_third_deng_mark_needed = yj_present and may_remove_i_or_umlaut_in_third_deng
      if (rounded and not always_round[final_id]) then
        if (no_third_deng_mark_needed) then
          medial = medial .. 'u'
        else
          medial = medial .. 'ü'
        end
      elseif (not no_third_deng_mark_needed and not final_has_i) then
        medial = medial .. 'i'
      end

    elseif (rounded and not always_round[final_id]) then
      medial = medial .. 'u'

      final = finalBase
    end
  end

  local tone = tones[tone_char]
  return initial .. medial .. finalBase , tone
end

return export