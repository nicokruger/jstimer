var jstimer = function(where) {
    
    var printTimer = function (t,indent) {
        var prefix="";
        for (var i = 0; i < indent; i++) prefix+=" ";

        $(where).val("");
        // print the subtimers
        var subtimers = t[3];
        _.keys(subtimers).forEach(function (subtimername) {
            var subtimes = subtimers[subtimername][1];
            var subtiming = subtimers[subtimername][0];

            $(where).val($(where).val() + "\n" + prefix + "  [S][" + subtimername +"] " + subtiming + " <" + subtimes + ">");
        });
        $(where).val($(where).val() + "\n" + "[T][" + t[0] + "] " + (t[1]));
    }
    
    var Timer = {
        timers : []
    };

    Timer.start = function (label) {
        var timer = [label, Date.now(), [], {}];
        this.timers.push(timer);
        return timer;
    }

    Timer.end = function () {
        var t = this.timers.pop();
        t[1] = (Date.now()-t[1]);
        if (typeof(console) !== 'undefined')
            printTimer(t, this.timers.length*4);
        return t;
    }

    Timer.substart = function(label) {
        var t = _.last(this.timers);
        if (t === undefined) return;
        var subtimers = t[2];
        var subtimerstotals = t[3];
        if (!_.contains(_.keys(subtimerstotals), label)) {
            subtimerstotals[label] = [0,0];
        };
        var subtimer = [label, Date.now()]
        subtimers.push(subtimer);
        return subtimer;
    }

    Timer.subend = function() {
        var t = _.last(this.timers);
        if (t === undefined) return;
        var subtimer = t[2].pop();
        var subtimertotal = t[3][subtimer[0]];
        subtimertotal[0] += (Date.now() - subtimer[1]);
        subtimertotal[1] += 1;
        return subtimertotal;
    }


    return function() {
        return Timer;
    }
    
}
//    function createBlock(x,y, width, height) {
   //     return $P($V(x-width,y-width), $V(x+width,y-height), $V(x+width,y+height), $V(x-width,y+height))
    //}


