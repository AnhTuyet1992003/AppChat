import EmojiPicker, {
    EmojiStyle,
    SkinTones,
    Theme,
    Categories,
    EmojiClickData,
    Emoji,
    SuggestionMode,
    SkinTonePickerLocation
} from "emoji-picker-react";
import {useState} from "react";

export default function Emoj() {
    const [selectedEmoji, setSelectedEmoji] = useState("");

    function onClick(emojiData, event) {
        setSelectedEmoji(emojiData.unified);
    }

    return (

        <>
            {selectedEmoji ? (
                <Emoji
                    unified={selectedEmoji}
                    emojiStyle={EmojiStyle.APPLE}
                    size={22}
                />

            ) : null}
            <EmojiPicker

                onEmojiClick={onClick}
                autoFocusSearch={false}
                // theme={Theme.AUTO}
                // searchDisabled
                // skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
                // height={350}
                // width="50%"
                // emojiVersion="0.6"
                // lazyLoadEmojis={true}
                // previewConfig={{
                //   defaultCaption: "Pick one!",
                //   defaultEmoji: "1f92a" // 🤪
                // }}
                // suggestedEmojisMode={SuggestionMode.RECENT}
                // skinTonesDisabled
                // searchPlaceHolder="Filter"
                // defaultSkinTone={SkinTones.MEDIUM}
                emojiStyle={EmojiStyle.NATIVE}
                // categories={[
                //   {
                //     name: "Fun and Games",
                //     category: Categories.ACTIVITIES
                //   },
                //   {
                //     name: "Smiles & Emotions",
                //     category: Categories.SMILEYS_PEOPLE
                //   },
                //   {
                //     name: "Flags",
                //     category: Categories.FLAGS
                //   },
                //   {
                //     name: "Yum Yum",
                //     category: Categories.FOOD_DRINK
                //   }
                // ]}
            />
        </>


    );
}
