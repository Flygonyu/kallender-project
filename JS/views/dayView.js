function dayView(){
    let html='';
    html+=`
    <div class="dayViewTop">
    <div class="modeButtonsContainer">
        <button class="modeButton dayButton">D</button>
        <button class="modeButton">W</button>
        <button class="modeButton">M</button>
        <button class="modeButton">Y</button>
    </div>
        <button class="splitDayButton">Del dag</button>
    <div class="dayPicker">
        <button class="back">&lt</button>
        <div class="currentDaySeen">27. TORSDAG</div>
        <button class="next">&gt</button>
    </div>
    <div class="currentMonthSeen">OKTOBER 2022</div>
    </div>
    `;
    return html;
}