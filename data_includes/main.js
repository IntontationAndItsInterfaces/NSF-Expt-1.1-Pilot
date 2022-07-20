
PennController.ResetPrefix(null) // Shorten command names (keep this line here)
// Show the 'welcome' trial first, then all the 'experiment' trial
// then send the results and finally show the trial labeled 'final'
function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
        }
Sequence( "instructions", "instructions2", "sample1", "getready", randomize("experiment"), "final" )

InitiateRecorder("https://plinglab.princeton.edu/IBEX/exptA/exptA-up.php").label("instructions")


Header(
    // We will use this global Var element later to store the participant's name
    newVar("ParticipantName")
        .global()
    ,
    // Delay of 250ms before every trial
    newTimer(250)
        .start()
        .wait()
)
.log( "Name" , getVar("ParticipantName") )
// This log command adds a column reporting the participant's name to every line saved to the results


// =============
// Instructions
// =============

newTrial("instructions",
	defaultText
		.left()
		.print()
	,
	newText("<h2>Before Beginning:</h2><ul><li><b><i>This does <u>not</u> work in Safari</i></b>. Please load this page in Chrome or Firefox.</li><li>Please make sure you are in a <b>quiet environment</b>, as your voice will be recorded.</li></ul>")
	,
	newText("<p><u><b>Instructions:</b></u><ul><li>In this task, you will be shown 12 short comic strips.</li><li>Your task is to <b>read over each strip <u>carefully</u></b>, and then <b>read aloud just <u>the one line</u> in the red bubble</b>.</li><li>We ask that you <b>take on the point of view</b> of the character whose line you are reading. Say the line the way that you think they would! (<i>This is sort of like doing voice acting</i>.)</li></ul></p>")
	,
	newButton("ContinueButton", "Continue")
		.right()
		.print()
		.log()
		.wait()
)

newTrial("instructions2",
	defaultText
		.left()
		.print()
	,
	newText("Before getting to the task itself, let's do a practice round.")
	,
	newButton("ContinueButton", "Continue")
		.right()
		.print()
		.log()
		.wait()
)

newTrial( "sample1" ,
         newText("instructions", "Read this comic strip CAREFULLY and then <b>answer the question</b> below about it. After that, <b>record yourself</b> speaking the line in the red bubble.")
            .css("font-size", "1.5em")
         ,
        newImage("sample1.jpg")
	        .size(1050, 186)
            .print()
            .center()
            .log()
        ,
         newText("q1", "What is the sentence in the red speech bubble doing?")
            .css("font-size", "1.5em")
         ,
         newScale("scale1", "Giving information", "Requesting information", "I can't tell")
            .css("font-size", "1.5em")
            .labelsPosition("right")
            .once()
         ,
         newText("q2", "What did the speaker of the red speech bubble think in the previous panel?")
            .css("font-size", "1.5em")
         ,
         newScale("scale2", "The opposite of what's in the red bubble", "What's in the red bubble", "I can't tell")
            .css("font-size", "1.5em")
            .labelsPosition("right")
            .once()
         ,
         newText("q3", "Who has more information about what's in the red speech bubble?")
            .css("font-size", "1.5em")
         ,
         newScale("scale3", "The person saying it", "The person they're talking to", "They both know the same amount", "I can't tell")
            .css("font-size", "1.5em")
            .labelsPosition("right")
            .once()
         ,
        newVar("question", "")
        ,
        getVar("question")
            .set(v => getRandomInt(3))
        ,
        getVar("question")
            .test.is("0")
            .success(
                getText("q1").print(),
                getScale("scale1")
                .print()
                .wait())
                .log()
            .test.is("1")
            .success(
                getText("q2").print(),
                getScale("scale2")
                .print()
                .wait()
                .log()
                )
            .test.is("2")
            .success(
                getText("q3").print(),
                getScale("scale3")
                .print()
                .wait()
                .log()
                )
        ,
        newMediaRecorder("sample1", "audio")
            .css("font-size", "1.5em")
            .print()
            .log()
            .wait()
        ,
        newButton("Next")
            .css("font-size", "1.5em")
            .print()
            .wait()
    )


newTrial("getready",
	defaultText
		.left()
		.print()
	,
	newText("Get ready! The task will begin on the next slide.")
	,
	newButton("ContinueButton", "Continue")
		.right()
		.print()
		.log()
		.wait()
)


// This Template command generates as many trials as there are rows in myTable.csv

Template( "myTable.csv" ,
    // Row will iteratively point to every row in myTable.csv
    variable => newTrial( "experiment" ,
        // The actual recording trials and comics start here
        newImage(variable.ImageFile)
	        .size(1050, 186)
            .print()
            .center()
            .log()
        ,
         newText("q1", "What is the sentence in the red speech bubble doing?")
            .css("font-size", "1.5em")
         ,
         newScale("scale1", "Giving information", "Requesting information", "I can't tell")
            .css("font-size", "1.5em")
            .labelsPosition("right")
            .once()
         ,
         newText("q2", "What did the speaker of the red speech bubble think in the previous panel?")
            .css("font-size", "1.5em")

         ,
         newScale("scale2", "The opposite of what's in the red bubble", "What's in the red bubble", "I can't tell")
            .css("font-size", "1.5em")
            .labelsPosition("right")
            .once()
         ,
         newText("q3", "Who has more information about what's in the red speech bubble?")
            .css("font-size", "1.5em")
         ,
         newScale("scale3", "The person saying it", "The person they're talking to", "They both know the same amount", "I can't tell")
            .css("font-size", "1.5em")
            .labelsPosition("right")
            .once()
         ,
        newVar("question", "")
        ,
        getVar("question")
            .set(v => getRandomInt(3))
        ,
        getVar("question")
            .test.is("0")
            .success(
                getText("q1").print(),
                getScale("scale1")
                .print()
                .wait())
                .log()
            .test.is("1")
            .success(
                getText("q2").print(),
                getScale("scale2")
                .print()
                .wait()
                .log()
                )
            .test.is("2")
            .success(
                getText("q3").print(),
                getScale("scale3")
                .print()
                .wait()
                .log()
                )
        ,
        newMediaRecorder(variable, "audio")
            .css("font-size", "1.5em")
            .print()
            .log()
            .wait()
        ,
        newButton("Next")
            .css("font-size", "1.5em")
            .print()
            .wait()
    )
)


// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability
newTrial( "final" ,
    newText("<p>Thank you for your participation!</p>")
            .css("font-size", "1.5em")
            .print()
    ,
    // Uploads the recordings
    UploadRecordings("sendAsync", "noblock")
    ,
    newButton("Finish")
            .css("font-size", "1.5em")
            .print()
            .wait()
        )

