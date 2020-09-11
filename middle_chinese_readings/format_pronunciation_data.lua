local infer_categories_module = require("infer_categories")
local pingshui_characters = require("pingshui_characters_list")

local infer_categories = infer_categories_module.infer_categories
local initialConv = infer_categories_module.initialConv
local finalConv = infer_categories_module.finalConv


local psw = require("modified_pingshui_wang_transcription")


local pronunciations = require("copied_from_mediawiki_and_wiktionary/pronunciation_data_raw")

local ordered_keys = {}
for k in pairs(pronunciations) do
    table.insert(ordered_keys, k)
end
table.sort(ordered_keys)

file = io.open("../pingshui_wang_transcription.tsv", "w")
file4 = io.open("../pingshui_wang_transcription_with_zhengzhang.tsv", "w")


for i, char_set in ipairs(pingshui_characters) do
    local to_print = ""
    for j, char in ipairs(char_set) do
        local character_pronunciations_raw = pronunciations[char]
        local transcriptions_together = ''
        for _, character_pronunciation_raw in ipairs(character_pronunciations_raw) do
            local transcription, tone = psw.getTranscription(character_pronunciation_raw)
            local tone_char = ''
            if (not (tone == '0')) then
                tone_char = tone
            end

        local initial, final, tone_char = infer_categories(character_pronunciation_raw)
        local zhengzhang = initialConv["Zhengzhang"][initial] .. finalConv["Zhengzhang"][final]
    

            transcriptions_together = transcriptions_together
             .. transcription 
             .. ' '
             .. zhengzhang
             .. ' '
             .. tone_char .. '\t'
        end
        to_print = to_print .. char .. '\t' .. transcriptions_together .. '- '
    end

    print(to_print)
end


for i = 1, #ordered_keys do
    local character, character_pronunciations_raw = ordered_keys[i], pronunciations[ ordered_keys[i] ]
    local character_pronunciations = ""
    local character_pronunciations_with_zhengzhang= ""
    for _, character_pronunciation_raw in ipairs(character_pronunciations_raw) do
        local transcription_without_tone, tone = psw.getTranscription(character_pronunciation_raw)
        character_pronunciations = character_pronunciations .. "\t" .. transcription_without_tone
        .. ' ' .. tone

        local initial, final, tone_char = infer_categories(character_pronunciation_raw)
        

        local zhengzhang = initialConv["Zhengzhang"][initial] .. finalConv["Zhengzhang"][final]

        character_pronunciations_with_zhengzhang = character_pronunciations_with_zhengzhang .. "\t" .. transcription_without_tone .. " " .. zhengzhang
        .. ' ' .. tone
    end
    file:write(character .. character_pronunciations .. '\n')
    file4:write(character .. character_pronunciations_with_zhengzhang .. '\n')

end

print(pingshui_characters)

local character, character_pronunciations_raw = ordered_keys[i], pronunciations[ ordered_keys[i] ]


print('done! check pingshui_wang_transcription.tsv.')
print('done! check pingshui_wang_transcription_with_wang.tsv.')
