local mw = require("lualib.mw")

local export = {}

local palatalisation_inducing = {
	[2] = true,
	[4] = true,
	[7] = true,
	[8] = true,
	[9] = true,
	[10] = true,
	[11] = true,
	[13] = true,
	[15] = true,
	[17] = true,
	[19] = true,
	[20] = true,
	[22] = true,
	[24] = true,
	[27] = true,
	[29] = true,
	[31] = true,
	[33] = true,
	[35] = true,
	[37] = true,
	[39] = true,
	[43] = true,
	[44] = true,
	[45] = true,
	[47] = true,
	[48] = true,
	[49] = true,
	[50] = true,
	[52] = true,
	[57] = true,
	[58] = true,
	[59] = true,
	[60] = true,
	[65] = true,
	[66] = true,
	[67] = true,
	[68] = true,
	[69] = true,
	[71] = true,
	[73] = true,
	[75] = true,
	[77] = true,
	[78] = true,
	[79] = true,
	[80] = true,
	[81] = true,
	[82] = true,
	[83] = true,
	[84] = true,
	[85] = true,
	[86] = true,
	[87] = true,
	[88] = true,
	[90] = true,
	[91] = true,
	[92] = true,
	[93] = true,
	[96] = true,
	[97] = true,
	[98] = true,
	[100] = true,
	[105] = true,
	[107] = true,
	[108] = true,
	[111] = true,
	[112] = true,
	[115] = true,
	[121] = true,
	[122] = true,
	[123] = true,
	[124] = true,
	[125] = true,
	[126] = true,
	[127] = true,
	[128] = true,
	[133] = true,
	[134] = true,
	[135] = true,
	[136] = true,
	[138] = true,
	[139] = true,
	[140] = true,
	[141] = true,
	[142] = true,
	[145] = true,
	[146] = true,
	[147] = true,
	[149] = true,
	[150] = true,
	[151] = true,
	[152] = true,
	[153] = true,
	[154] = true,
	[155] = true,
	[156] = true,
	[157] = true,
	[158] = true,
}

local labialisation_inducing = {
	[1] = true,
	[3] = true,
	[6] = true,
	[12] = true,
	[14] = true,
	[16] = true,
	[18] = true,
	[21] = true,
	[23] = true,
	[26] = true,
	[28] = true,
	[30] = true,
	[32] = true,
	[34] = true,
	[36] = true,
	[38] = true,
	[40] = true,
	[42] = true,
	[55] = true,
	[56] = true,
	[62] = true,
	[64] = true,
	[70] = true,
	[72] = true,
	[76] = true,
	[95] = true,
	[99] = true,
	[102] = true,
	[104] = true,
	[106] = true,
	[110] = true,
	[114] = true,
	[118] = true,
}

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

local r_lenition_inducing = {
	[11] = true,
	[15] = true,
	[19] = true,
}

local initial_outcomes = {
	[1] = "b", [2] = "p", [3] = "b", [4] = "m",
	[5] = "d", [6] = "t", [7] = "d", [8] = "n",
	[9] = "zh", [10] = "ch", [11] = "zh", [12] = "n",
	[13] = "z", [14] = "c", [15] = "z", [16] = "s", [17] = "s",
	[18] = "zh", [19] = "ch", [20] = "zh", [21] = "sh", [22] = "s",
	[23] = "zh", [24] = "ch", [25] = "sh", [26] = "sh", [27] = "sh",
	[28] = "g", [29] = "k", [30] = "g", [32] = "h", [33] = "h",
	[31] = "", [34] = "", [35] = "", [36] = "",
	[37] = "l", [38] = "r",
}

local rhyme_outcomes = {
	[1] = { "eng", "ong", "-", "-", "-", "ong", "eng", "ong", "-" },
	[2] = { "eng", "ong", "ong", "ong", "ong", "iong", "ong", "ong", "ong" },
	[3] = { "u", "u", "-", "-", "-", "u", "u", "u", "-" },
	[4] = { "u", "u", "u", "u", "u", "u", "u", "ü", "u" },
	[5] = { "eng", "ong", "-", "-", "-", "ong", "-", "ong", "-" },
	[6] = { "u", "u", "-", "-", "-", "u", "u", "u", "-" },
	[7] = { "eng", "ong", "ong", "-", "ong", "iong", "ong", "ong", "ong" },
	[8] = { "u", "u", "u", "-", "u", "u", "u", "ü", "u" },
	[9] = { "ang", "-", "uang", "uang", "-", "iang", "ang", "ang", "-" },
	[10] = { "o", "-", "uo", "uo", "-", "ue", "ue", "uo", "-" },
	[11] = { "i", "i", "-", "-", "i", "i", "i", "i", "er" },
	[12] = { "-", "ui", "-", "-", "ui", "ui", "ei", "ei", "ui" },
	[13] = { "i", "-", "i", "i", "-", "i", "i", "i", "-" },
	[14] = { "-", "-", "ui", "uai", "-", "ui", "ei", "ei", "-" },
	[15] = { "i", "i", "-", "-", "i", "i", "i", "i", "er" },
	[16] = { "-", "ui", "-", "-", "ui", "ui", "ei", "ei", "ui" },
	[17] = { "i", "i", "i", "i", "i", "i", "i", "i", "-" },
	[18] = { "-", "-", "ui", "uai", "ui", "ui", "ei", "-", "-" },
	[19] = { "-", "i", "i", "i", "i", "i", "i", "i", "er" },
	[20] = { "-", "-", "-", "-", "-", "i", "i", "-", "-" },
	[21] = { "ei", "-", "-", "-", "-", "ui", "ei", "-", "-" },
	[22] = { "-", "u", "u", "u", "u", "u", "u", "ü", "u" },
	[23] = { "u", "u", "-", "-", "-", "u", "u", "u", "-" },
	[24] = { "u", "u", "u", "u", "u", "u", "u", "ü", "u" },
	[25] = { "ei", "ai", "-", "-", "-", "ai", "ai", "ai", "-" },
	[26] = { "ui", "ui", "-", "-", "-", "ui", "ei", "ei", "-" },
	[27] = { "-", "-", "-", "-", "-", "-", "i", "-", "-" },
	[28] = { "ei", "-", "-", "-", "-", "ui", "ei", "-", "-" },
	[29] = { "ai", "-", "ai", "ai", "-", "ie", "e", "-", "-" },
	[30] = { "-", "uai", "-", "uai", "-", "uai", "ai", "-", "-" },
	[31] = { "ai", "-", "ai", "ai", "-", "ia", "a", "ai", "-" },
	[32] = { "-", "-", "uai", "-", "-", "ua", "a", "-", "-" },
	[33] = { "ai", "-", "ai", "ai", "-", "ie", "e", "ai", "-" },
	[34] = { "-", "-", "uai", "uai", "-", "uai", "ai", "ai", "-" },
	[35] = { "i", "i", "-", "-", "i", "-", "i", "i", "-" },
	[36] = { "-", "ui", "-", "-", "ui", "-", "ei", "-", "ui" },
	[37] = { "-", "-", "i", "i", "-", "i", "i", "-", "-" },
	[38] = { "-", "-", "ui", "uai", "-", "ui", "ei", "-", "-" },
	[39] = { "i", "i", "-", "-", "-", "i", "i", "i", "-" },
	[40] = { "-", "-", "-", "-", "-", "ui", "ei", "-", "-" },
	[41] = { "ei", "ai", "-", "-", "-", "ai", "ai", "ai", "-" },
	[42] = { "ei", "ui", "-", "-", "-", "ui", "ei", "ei", "-" },
	[43] = { "in", "in", "-", "-", "en", "in", "in", "in", "en" },
	[44] = { "in", "-", "en", "en", "-", "in", "in", "in", "-" },
	[45] = { "-", "-", "-", "-", "-", "un", "un", "-", "-" },
	[46] = { "-", "-", "-", "en", "-", "-", "-", "-", "-" },
	[47] = { "-", "un", "un", "-", "un", "un", "un", "un", "un" },
	[48] = { "i", "i", "-", "-", "i", "i", "i", "i", "i" },
	[49] = { "i", "-", "i", "-", "-", "i", "i", "i", "-" },
	[50] = { "-", "-", "-", "-", "-", "-", "u", "-", "-" },
	[51] = { "-", "-", "-", "e", "-", "-", "-", "-", "-" },
	[52] = { "-", "u", "u", "uai", "u", "u", "u", "ü", "-" },
	[53] = { "-", "un", "-", "-", "-", "en", "en", "-", "-" },
	[54] = { "-", "-", "-", "-", "-", "e", "-", "-", "-" },
	[55] = { "en", "un", "-", "-", "-", "un", "en", "un", "-" },
	[56] = { "u", "u", "-", "-", "-", "u", "u", "u", "-" },
	[57] = { "-", "-", "-", "-", "-", "in", "in", "-", "-" },
	[58] = { "-", "-", "-", "-", "-", "i", "i", "-", "-" },
	[59] = { "en", "-", "-", "-", "-", "un", "un", "-", "-" },
	[60] = { "u", "-", "-", "-", "-", "u", "u", "-", "-" },
	[61] = { "an", "an", "-", "-", "-", "an", "an", "an", "-" },
	[62] = { "an", "uan", "-", "-", "-", "uan", "an", "uan", "-" },
	[63] = { "a", "a", "-", "-", "-", "e", "e", "a", "-" },
	[64] = { "o", "uo", "-", "-", "-", "uo", "o", "uo", "-" },
	[65] = { "-", "-", "-", "-", "-", "ian", "an", "-", "-" },
	[66] = { "an", "-", "-", "-", "-", "uan", "uan", "-", "-" },
	[67] = { "-", "-", "-", "-", "-", "ie", "e", "-", "-" },
	[68] = { "a", "-", "-", "-", "-", "ue", "ue", "-", "-" },
	[69] = { "an", "-", "an", "an", "-", "ian", "an", "an", "-" },
	[70] = { "-", "-", "-", "uan", "-", "uan", "an", "uan", "-" },
	[71] = { "a", "-", "a", "a", "-", "ia", "a", "-", "-" },
	[72] = { "-", "-", "ua", "ua", "-", "ua", "a", "a", "-" },
	[73] = { "an", "-", "an", "an", "-", "ian", "an", "an", "-" },
	[74] = { "-", "-", "-", "uan", "-", "uan", "-", "uan", "-" },
	[75] = { "a", "-", "-", "a", "-", "ia", "a", "a", "-" },
	[76] = { "-", "-", "ua", "ua", "-", "ua", "a", "a", "-" },
	[77] = { "ian", "ian", "-", "-", "an", "ian", "an", "ian", "an" },
	[78] = { "-", "uan", "-", "-", "uan", "uan", "uan", "uan", "uan" },
	[79] = { "ian", "-", "an", "an", "-", "ian", "an", "ian", "-" },
	[80] = { "-", "-", "uan", "uan", "-", "uan", "uan", "-", "-" },
	[81] = { "ie", "ie", "-", "-", "e", "-", "e", "ie", "e" },
	[82] = { "-", "ue", "-", "-", "uo", "ue", "ue", "üe", "uo" },
	[83] = { "ie", "-", "e", "e", "-", "ue", "e", "-", "-" },
	[84] = { "-", "-", "uo", "uo", "-", "ue", "ue", "üe", "-" },
	[85] = { "ian", "ian", "-", "-", "-", "ian", "an", "ian", "-" },
	[86] = { "-", "-", "-", "-", "-", "uan", "uan", "-", "-" },
	[87] = { "ie", "ie", "-", "-", "-", "ie", "e", "ie", "-" },
	[88] = { "-", "-", "-", "-", "-", "ue", "ue", "-", "-" },
	[89] = { "ao", "ao", "-", "-", "-", "ao", "ao", "ao", "-" },
	[90] = { "ao", "-", "ao", "ao", "-", "iao", "ao", "ao", "-" },
	[91] = { "iao", "iao", "-", "-", "ao", "iao", "ao", "iao", "ao" },
	[92] = { "iao", "-", "ao", "-", "-", "iao", "ao", "-", "-" },
	[93] = { "iao", "iao", "-", "-", "-", "iao", "ao", "iao", "-" },
	[94] = { "uo", "uo", "-", "-", "-", "e", "e", "uo", "-" },
	[95] = { "o", "uo", "-", "-", "-", "uo", "o", "uo", "-" },
	[96] = { "-", "-", "-", "-", "-", "ie", "-", "-", "-" },
	[97] = { "-", "ue", "-", "-", "-", "ue", "ue", "üe", "-" },
	[98] = { "a", "a", "a", "a", "-", "ia", "a", "a", "-" },
	[99] = { "-", "-", "ua", "ua", "-", "ua", "a", "-", "-" },
	[100] = { "ie", "ie", "e", "-", "e", "-", "e", "-", "e" },
	[101] = { "ang", "ang", "-", "-", "-", "ang", "ang", "ang", "-" },
	[102] = { "-", "-", "-", "-", "-", "uang", "ang", "-", "-" },
	[103] = { "o", "uo", "-", "-", "-", "e", "e", "uo", "-" },
	[104] = { "o", "uo", "-", "-", "-", "uo", "o", "uo", "-" },
	[105] = { "-", "iang", "ang", "uang", "ang", "iang", "ang", "iang", "ang" },
	[106] = { "ang", "-", "-", "-", "-", "uang", "ang", "-", "-" },
	[107] = { "-", "ue", "uo", "uo", "uo", "ue", "ue", "üe", "uo" },
	[108] = { "o", "-", "-", "-", "-", "ue", "ue", "-", "-" },
	[109] = { "eng", "eng", "eng", "eng", "-", "eng", "eng", "eng", "-" },
	[110] = { "-", "-", "-", "-", "-", "ong", "eng", "-", "-" },
	[111] = { "ing", "-", "-", "eng", "-", "ing", "ing", "-", "-" },
	[112] = { "-", "-", "-", "-", "-", "iong", "ong", "-", "-" },
	[113] = { "o", "-", "e", "a", "-", "e", "e", "-", "-" },
	[114] = { "-", "-", "-", "-", "-", "e", "o", "uo", "-" },
	[115] = { "i", "-", "-", "i", "-", "i", "i", "-", "-" },
	[116] = { "-", "-", "-", "-", "-", "-", "u", "-", "-" },
	[117] = { "eng", "-", "eng", "eng", "-", "eng", "eng", "eng", "-" },
	[118] = { "-", "-", "-", "-", "-", "ong", "eng", "-", "-" },
	[119] = { "o", "-", "e", "e", "-", "e", "e", "e", "-" },
	[120] = { "-", "-", "-", "uo", "-", "uo", "-", "-", "-" },
	[121] = { "ing", "ing", "eng", "-", "eng", "ing", "ing", "ing", "-" },
	[122] = { "-", "ing", "-", "-", "-", "iong", "ong", "-", "-" },
	[123] = { "i", "i", "i", "-", "i", "-", "i", "-", "-" },
	[124] = { "-", "u", "-", "-", "u", "u", "u", "-", "-" },
	[125] = { "ing", "ing", "-", "-", "-", "ing", "ing", "ing", "-" },
	[126] = { "-", "-", "-", "-", "-", "iong", "ong", "-", "-" },
	[127] = { "i", "i", "-", "-", "-", "i", "i", "i", "-" },
	[128] = { "-", "-", "-", "-", "-", "u", "-", "-", "-" },
	[129] = { "eng", "eng", "-", "-", "-", "eng", "-", "eng", "-" },
	[130] = { "-", "-", "-", "-", "-", "ong", "-", "-", "-" },
	[131] = { "o", "e", "-", "-", "-", "e", "e", "e", "-" },
	[132] = { "-", "-", "-", "-", "-", "uo", "-", "-", "-" },
	[133] = { "ing", "ing", "eng", "eng", "eng", "ing", "ing", "ing", "eng" },
	[134] = { "i", "i", "i", "e", "i", "i", "i", "i", "-" },
	[135] = { "-", "-", "-", "-", "-", "u", "u", "-", "-" },
	[136] = { "ou", "iu", "ou", "ou", "ou", "iu", "ou", "iu", "ou" },
	[137] = { "ou", "ou", "-", "-", "-", "ou", "ou", "ou", "-" },
	[138] = { "iao", "iu", "-", "ou", "-", "iu", "ou", "iu", "-" },
	[139] = { "-", "in", "-", "-", "en", "in", "in", "in", "en" },
	[140] = { "in", "-", "en", "en", "-", "in", "in", "in", "-" },
	[141] = { "-", "i", "-", "-", "i", "-", "i", "i", "i" },
	[142] = { "i", "-", "i", "e", "-", "i", "i", "i", "-" },
	[143] = { "an", "an", "-", "-", "-", "an", "an", "an", "-" },
	[144] = { "a", "a", "-", "-", "-", "e", "e", "a", "-" },
	[145] = { "-", "-", "-", "-", "-", "ian", "an", "-", "-" },
	[146] = { "an", "-", "uan", "-", "-", "uan", "-", "-", "-" },
	[147] = { "-", "-", "-", "-", "-", "ie", "e", "-", "-" },
	[148] = { "a", "-", "-", "-", "-", "-", "-", "-", "-" },
	[149] = { "an", "-", "-", "an", "-", "ian", "an", "-", "-" },
	[150] = { "-", "-", "a", "a", "-", "ia", "a", "-", "-" },
	[151] = { "-", "-", "an", "an", "-", "ian", "an", "an", "-" },
	[152] = { "-", "-", "a", "a", "-", "ia", "a", "a", "-" },
	[153] = { "-", "ian", "-", "-", "an", "ian", "an", "ian", "an" },
	[154] = { "-", "-", "an", "an", "-", "ian", "an", "ian", "-" },
	[155] = { "-", "ie", "-", "-", "e", "ie", "e", "ie", "e" },
	[156] = { "-", "-", "e", "e", "-", "ie", "e", "ie", "-" },
	[157] = { "ian", "ian", "-", "-", "-", "ian", "an", "ian", "-" },
	[158] = { "ie", "ie", "-", "-", "-", "ie", "-", "ie", "-" },
	[159] = { "an", "an", "-", "-", "-", "an", "an", "an", "-" },
	[160] = { "a", "a", "-", "-", "-", "e", "e", "a", "-" },
}

local initial_class = {
	[1] = 1,
	[2] = 1,
	[3] = 1,
	[4] = 1,
	[5] = 2,
	[6] = 2,
	[7] = 2,
	[8] = 2,
	[9] = 3,
	[10] = 3,
	[11] = 3,
	[12] = 8,
	[13] = 2,
	[14] = 2,
	[15] = 2,
	[16] = 2,
	[17] = 2,
	[18] = 4,
	[19] = 4,
	[20] = 4,
	[21] = 4,
	[22] = 4,
	[23] = 5,
	[24] = 5,
	[25] = 5,
	[26] = 5,
	[27] = 5,
	[28] = 6,
	[29] = 6,
	[30] = 6,
	[31] = 6,
	[32] = 6,
	[33] = 6,
	[34] = 7,
	[35] = 7,
	[36] = 7,
	[37] = 8,
	[38] = 9,
}

local devoicing_initial = {
	[3] = true,
	[7] = true,
	[11] = true,
	[15] = true,
	[20] = true,
	[25] = true,
	[30] = true,
}

local devoicing_outcomes = {
	["b"] = "p",
	["d"] = "t",
	["zh"] = "ch",
	["z"] = "c",
	["sh"] = "ch",
	["g"] = "k",
	["j"] = "q",
	["f"] = "f",
}

local palatalisation_outcomes = {
	["z"] = "j",
	["c"] = "q",
	["s"] = "x",
	["g"] = "j",
	["k"] = "q",
	["h"] = "x",
	[""] = "y",
}

local fricativisation_initial = {
	[1] = true,
	[2] = true,
	[3] = true,
}

local palatalisation_initial_dental = {
	[13] = true,
	[14] = true,
	[15] = true,
	[16] = true,
	[17] = true,
}

local palatalisation_initial_velar_glottal = {
	[28] = true,
	[29] = true,
	[30] = true,
	[31] = true,
	[32] = true,
	[33] = true,
	[34] = true,
	[35] = true,
	[36] = true,
}

local labialisation_initial = {
	[31] = true,
	[34] = true,
	[35] = true,
	[36] = true,
}

local fully_voiced_initial = {
	[3] = true,
	[7] = true,
	[11] = true,
	[15] = true,
	[17] = true,
	[20] = true,
	[22] = true,
	[25] = true,
	[27] = true,
	[30] = true,
	[33] = true,
}

local partially_voiced_initial = {
	[4] = true,
	[8] = true,
	[12] = true,
	[31] = true,
	[35] = true,
	[36] = true,
	[37] = true,
	[38] = true,
}

function export.predict_cmn(initial, final, tone)
	initialClass = initial_class[initial]
	initial_result = initial_outcomes[initial]
	
	if fricativisation_inducing[final] and fricativisation_initial[initial] then
		initial_result = "f"
	end
	if m_lenition_inducing[final] and initial == 4 then
		initial_result = "w"
	end
	
	if palatalisation_inducing[final] and final > 20 and palatalisation_initial_dental[initial] then
		initial_result = palatalisation_outcomes[initial_result]
	
	elseif palatalisation_inducing[final] and palatalisation_initial_velar_glottal[initial] then
		initial_result = palatalisation_outcomes[initial_result]
	end
	
	if labialisation_inducing[final] and labialisation_initial[initial] then
		initial_result = "w"
	end
	
	if tone == 1 and devoicing_initial[initial] then
		initial_result = devoicing_outcomes[initial_result]
	end
	
	if r_lenition_inducing[final] and initial == 38 then
		initial_result = ""
	end
	
	final_result = rhyme_outcomes[final][initialClass]
	
	if tone == 1 then
		if fully_voiced_initial[initial] or partially_voiced_initial[initial] then
			tone_result = 2
		else
			tone_result = 1
		end

	elseif tone == 2 then
		if fully_voiced_initial[initial] then
			tone_result = 4
		else
			tone_result = 3
		end
	
	elseif tone == 3 then
		tone_result = 4
	
	else
		if fully_voiced_initial[initial] then
			tone_result = 2
	
		elseif partially_voiced_initial[initial] then
			tone_result = 4
	
		else
			tone_result = ""
		end
	end
	
	result = mw.ustring.gsub(initial_result .. final_result .. tone_result, "yi([aeou])", "y%1")
	result = mw.ustring.gsub(result, "wu([aeou])", "w%1")
	result = mw.ustring.gsub(result, "wui", "wei")
	
	return result
end

return export