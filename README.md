Timer lib
---------

Small timer library to do basic profiling of code.

Create a timer with:

     var timerCreator = timer($("#some_textarea"));

     var t = timerCreator();

     t.start("description")
     t.substart("description1")
     t.subend()
     t.end() etc.


Gives output like the following:


        [S][Get all div's] 0 <1>
        [S][Perform operation [295]] 78 <1>
        [S][Change content] 68 <295>
        [S][Waste some time] 6 <295>
      [T][Top-level operation] 78



