import React from 'react';
import Detail from './detail'
import Overview from './overview'
import background from '../images/background.png'

const base = {
    display: "flex",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start'
}

const Result = (props) => {
    const result = props.result

    return (
        <div background={background} style={base}>
            <Overview fate={result.fate} content={result.content}></Overview>
            {Object.keys(result).forEach((key, value) => {
                if (key !== 'overview') return (<Detail title={key} content={value}/>)
            })}
        </div>
    )
}

export default Result







/*
    <div class="resultArea" id="syoukichi_1" style="display: block; left: 681.5px;">
<div class="resultInner">
<div class="inner">
<div class="descript">
<h1 class="alignC"><img src="/lot/images/lot_xiaoji.gif" alt="愛宕神社おみくじ" width="136" height="61"></h1>
<p>今日はあなたのちょっとした一言が問題を生み出しやすい日です。<br>ことばを慎んで、あなたの時が来るのを待ちましょう。<br>わき目をふらず正直に働き、神さまに対する感謝の気持ちを忘れなければ、<br>幸福は自然とやってきます</p>
<!-- / .descript --></div>
<div class="detail">
<dl>
<dt class="floatL">【願い事】</dt>
<dd>今日、明日中にはかないません。<br>しかし、それを心に思い続けていれば、後にかならずかないます</dd>
<dt class="floatL">【待ち人】</dt>
<dd>その人は来ません。しかし、何かいい便りが・・・</dd>
<dt class="floatL">【失し物】</dt>
<dd>ちょっと手間取るかも</dd>
<dt class="floatL">【旅行】</dt>
<dd>病気、盗難に注意しましょう</dd>
<dt class="floatL">【ビジネス】</dt>
<dd>あまり利益は期待できません</dd>
<dt class="floatL">【学問】</dt>
<dd>もうちょっとまじめに勉強しましょう</dd>
<dt class="floatL">【争い事】</dt>
<dd>勝つことは難しいので、できれば避けましょう</dd>
<dt class="floatL">【恋愛】</dt>
<dd>この人は手放さない方がいいかも</dd>
<dt class="floatL">【縁談】</dt>
<dd>うまくいきそうなときに何か障害が生じそう。<br>人に任せた方がうまくいきます</dd>
<dt class="floatL">【転居】</dt>
<dd>あせらずにゆっくり</dd>
<dt class="floatL">【病気】</dt>
<dd>ちゃんと医師さんを探しましょう。<br>甘くみないようにね。</dd>
</dl>
</div>
</div>
<p class="alignC">これはあくまでもおみくじです。神様への日々の感謝の気持ちを大切に。</p>
<p class="closeOverlay"><span>閉じる</span></p>
</div>
<!-- / .resultArea --></div>
*/
