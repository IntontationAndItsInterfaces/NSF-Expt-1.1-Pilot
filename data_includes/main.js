PennController.ResetPrefix(null) // Shorten command names (keep this line here)



// =============
// custom Javascript functions:
// =============
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

const CSVToArray = (data, delimiter = ',', omitFirstRow = false) =>
	data
		.slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
		.split('\n')
		.map(v => v.split(delimiter));

function getNumLines(colName) {
	// UPDATE THIS VARIABLE TO BE THE CONTENTS OF THE .CSV FILE, AFTER REPLACING EACH LINEBREAK WITH "\n"
	var textCSV = "ImageFile\n1A.jpg\n14B.jpg\n3C.jpg\n4D.jpg\n5A.jpg\n6B.jpg\n7C.jpg\n8D.jpg\n9A.jpg\n10B.jpg\n11C.jpg\n12D.jpg"
	var arrayCSV = CSVToArray(textCSV);
	var col = arrayCSV.map(function(value,index) { return value[arrayCSV[0].indexOf(colName)]; });
	var filtered = col.filter(function (el) {
	  return el != "";
	});
    nl = filtered.length;
	return(nl-1);
}



// =============
// Sequence for how to run the PennController:
// =============
Sequence("whoareyou", "init", "instructions", "instructions2", "sample1", "getready", randomize("experiment"), "final" )



// =============
// This must be in the sequence by the time a recorder is created:
// =============
InitiateRecorder("https://plinglab.princeton.edu/IBEX/ex11p/ex11p-up.php")
	.label("init")
	.setOption("hideProgressBar",true)



// =============
// Setting some variables
// =============
Header(
	// The number of trials in the csv file
	newVar("trialsTotal", 0)
		.global()
	,
	getVar("trialsTotal")
		.set(v => v + getNumLines("ImageFile"))
	,
	// The number of trials completed
	newVar("trialsDone", 0)
		.global()
	,
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
// Instructions + Sample
// =============
newTrial("instructions",
	// this is how you concatenate in PCIbex -- create a new variable, set it to the an one, and then add up the new variable with other parts of a string
	newVar("newstring")
		.set(getVar("trialsTotal"))
		.set(v => "<h2>Before Beginning: Your voice will be recorded</h2><ul><li>Make sure you have a <b>working microphone</b> on your device.</li><li>Make sure that <b>NO OTHER APPS</b> (e.g., Zoom) are using your microphone at the moment.</li><li>Also please make sure your surroundings are <b>as quiet as possible</b> (no TVs, music, etc. in the background).</li></ul><p><u><b>Instructions:</b></u><ul><li>In this task, you will be shown "+v+" short comic strips.</li><li>Your task is to <b>read over each strip <u>carefully</u></b>, and then <b>read aloud just <u>the one line</u> in the red bubble</b>.</li><li>We ask that you <b>take on the point of view</b> of the character whose line you are reading. Say the line the way that you think they would! (<i>This is sort of like doing voice acting</i>.)</li></ul></p><h2>While doing this task, your browser <u>will go fullscreen<u>.</h2>")
	,
	newCanvas("theInstructions", 1088, 500)
		.css("padding", "100px")
		.add("center at 50%", "top at 0px", 
			newText("numTrials","")
			.css("font-size", "12px")
			.text(getVar("newstring"))
			.left()
		)
		.add("center at 50%", "bottom at 500px",
			newButton("ContinueButton", "Continue")
		)
		.scaling("page")
		.print("center at 50%", "top at 50px")
	,
	getButton("ContinueButton")
		.wait()
)
.setOption("hideProgressBar",true)



newTrial("instructions2",
	fullscreen()
	,
	newCanvas("moreInstructions", 1088, 500)
		.css("padding", "100px")
		.add("center at 50%", "top at 200px", 
			newText("Before getting to the task itself, let's do a practice round.")
			.css("font-size", "20px")
			.center()
		)
		.add("center at 50%", "bottom at 500px",
			newButton("ContinueButton", "Continue")
		)
		.scaling("page")
		.print("center at 50%", "top at 50px")
	,
	getButton("ContinueButton")
		.wait()
)
.setOption("hideProgressBar",true)



newTrial( "sample1" ,
	newText("instructionsLocal", "Read this comic strip CAREFULLY and then <b>answer the question</b> below about it. After that, <b>record yourself</b> speaking the line in the red bubble.")
		.css("font-size", "20px")
	,
	newCanvas("comicstrip").center()
	,
	newCanvas("recorder").center()
	,
	newImage("sample1", "sample1.jpg")
		.size(1050, 186)
		.print(getCanvas("comicstrip"))
		.log()
	,
	newText("q1", "Who knows more about the contents of the red speech bubble?")
		.color("blue").bold()
		.css("font-size", "16px")
	,
	newScale("WhoKnowsMore", "The person saying it"+"&emsp;", "The person they're talking to"+"&emsp;", "I can't tell")
		.css("font-size", "12px")
		.settings.labels("right")
		.color("CornflowerBlue")
		.log()
	,
	newText("q2", "Did the speaker of the red speech bubble change their minds over the course of the comic strip?")
		.color("blue").bold()
		.css("font-size", "16px")
	,
	newScale("ChangedMind", "Yes"+"&emsp;", "No"+"&emsp;", "I can't tell")
		.css("font-size", "12px")
		.settings.labels("right")
		.color("CornflowerBlue")
		.log()
	,
	newText("q3", "Does this comic strip make sense?")
		.color("blue").bold()
		.css("font-size", "16px")
	,
	newScale("MakesSense", "&emsp;"+"No"+"&emsp;", "&emsp;"+"Not really"+"&emsp;", "&emsp;"+"Kinda"+"&emsp;", "&emsp;"+"Mostly"+"&emsp;", "&emsp;"+"Yes"+"&emsp;")
		.color("CornflowerBlue")
		.css("font-size", "12px")
		.settings.labels("top")
		.log()
	,
	newText("q4", "<b>Any feedback about this comic?</b> <span style='font-size: 10px; font-style: italic;'>(Typos? Lack of clarity? Something you think should be changed? Be as detailed or as broad as you want!)</span>")
		.color("blue").css("font-size","14px")
	,
	newTextInput("ComicFeedback", "")
		.color("CornflowerBlue")
		.log()
		.lines(2)
		.size(800, 30)
	,
	newVar("question", "")
	,
	getVar("question")
		.set(v => getRandomInt(2))
	,
	newButton("moveOn", "Continue")
		.css("font-size", "12px")
		.center()
	,
	newText("please-re-read", "Re-read the comic, and get ready to record the red speech bubble.")
		.css("font-size", "12px")
		.italic()
		.color("red")
	,
	newButton("nowRecord", "Ready to Record")
		.css("font-size", "12px")
		.center()
	,
	newButton("done", "Next")
		.css("font-size", "12px")
		.center()
	,
// FIRST CANVAS
	newCanvas("questionTime", 1088, 500)
		.css("padding", "100px")
		.add("center at 50%", "top at 100px", getCanvas("comicstrip"))
		.add("center at 50%", "top at 50px", getText("instructionsLocal"))
	,
	getVar("question")
		.test.is("0").success(
			getCanvas("questionTime")
			.add("center at 50%", "top at 290px", getText("q1"))
			.add("center at 50%", "top at 320px", getScale("WhoKnowsMore"))
			)
		.test.is("1").success(
			getCanvas("questionTime")
			.add("center at 50%", "top at 290px", getText("q2"))
			.add("center at 50%", "top at 320px", getScale("ChangedMind"))
			)
	,
	getCanvas("questionTime")
		.add("center at 50%", "bottom at 500px", getButton("moveOn"))
		.scaling("page")
		.print("center at 50%","top at 50px")
	,
	getButton("moveOn")
		.wait( getScale("WhoKnowsMore").test.selected() 
			.or( getScale("ChangedMind").test.selected() )
			.success(getCanvas("feedback").remove())
			.failure(
				newCanvas("feedback", "100vw", "14px")
					.add( "center at 50%", "middle at 50%", 
						newText("errorC1-s", "You must answer the question first.")
							.center()
							.color("red")
					)
					.print( "center at 50%", "top at 500px", "questionTime")
			)
		)
	,
	getCanvas("questionTime")
		.remove()
	,
// SECOND CANVAS
	newCanvas("moreQuestions", 1088, 500)
		.css("padding", "100px")
		.add("center at 50%", "top at 100px", getCanvas("comicstrip"))
		.add("center at 50%", "top at 50px", getText("instructionsLocal"))
		.add("center at 50%", "top at 290px", getText("q3"))
		.add("center at 50%", "top at 310px", getScale("MakesSense"))
		.add("center at 50%", "top at 370px", getText("q4"))
		.add("center at 50%", "top at 395px", getTextInput("ComicFeedback"))		
		.add("center at 50%", "bottom at 475px", getText("please-re-read"))
		.add("center at 50%", "bottom at 500px", getButton("nowRecord"))
		.scaling("page")
		.print("center at 50%", "top at 50px")
	,
	getButton("nowRecord")
		.wait( getScale("MakesSense").test.selected() 
			.success(getCanvas("feedback2").remove())
			.failure(
				newCanvas("feedback2", "100vw", "14px")
					.add( "center at 50%", "middle at 50%", 
						newText("errorC2-s", "You must answer the question first.")
							.center()
							.color("red")
					)
					.print( "center at 50%", "top at 500px", "moreQuestions")
			)
		)
	,
	getCanvas("moreQuestions")
		.remove()
	,
// THIRD CANVAS
	newCanvas("recordingTime", 1088, 500)
		.css("padding", "100px")
		.add("center at 50%", "top at 100px", getCanvas("comicstrip"))
		.add("center at 50%", "top at 50px", getText("instructionsLocal"))
		.add("center at 50%", "top at 290px", getCanvas("recorder"))
		.scaling("page")
		.print("center at 50%", "top at 50px")
	,
	newMediaRecorder("sample1.jpg", "audio").css("font-size", "12px").log().record().print(getCanvas("recorder")).wait()
	,
	getButton("done")
		.print("center at 50%", "bottom at 500px", "recordingTime")
		.wait()
)
.setOption("hideProgressBar",true)



// =============
// Starting the actual trials
// =============
newTrial("getready",
	newCanvas("readyForMore", 1088, 500)
		.css("padding", "100px")
		.add("center at 50%", "top at 200px", 
			newText("<p>Great! The rest of this task will be very much the same.</p><p>Get ready!</p>")
			.css("font-size", "20px")
			.center()
		)
		.add("center at 50%", "bottom at 500px",
			newButton("ContinueButton", "Continue")
		)
		.scaling("page")
		.print("center at 50%", "top at 50px")
	,
	getButton("ContinueButton")
		.wait()
)
.setOption("hideProgressBar",true)



Template( "fullList.csv" ,
	variable => newTrial( "experiment" ,
		newCanvas("comicstrip").center()
		,
		newCanvas("recorder").center()
		,
		newImage(variable.ImageFile+"-img", variable.ImageFile).size(1050, 186).print(getCanvas("comicstrip")).log()
		,
		newText("q1", "Who knows more about the contents of the red speech bubble?")
			.color("blue").bold()
			.css("font-size", "16px")
		,
		newScale("WhoKnowsMore", "The person saying it"+"&emsp;", "The person they're talking to"+"&emsp;", "I can't tell")
			.css("font-size", "12px")
			.settings.labels("right")
			.color("CornflowerBlue")
			.log()
		,
		newText("q2", "Did the speaker of the red speech bubble change their minds over the course of the comic strip?")
			.color("blue").bold()
			.css("font-size", "16px")
		,
		newScale("ChangedMind", "Yes"+"&emsp;", "No"+"&emsp;", "I can't tell")
			.css("font-size", "12px")
			.settings.labels("right")
			.color("CornflowerBlue")
			.log()
		,
		newText("q3", "Does this comic strip make sense?")
			.color("blue").bold()
			.css("font-size", "16px")
		,
		newScale("MakesSense", "&emsp;"+"No"+"&emsp;", "&emsp;"+"Not really"+"&emsp;", "&emsp;"+"Kinda"+"&emsp;", "&emsp;"+"Mostly"+"&emsp;", "&emsp;"+"Yes"+"&emsp;")
			.color("CornflowerBlue")
			.css("font-size", "12px")
			.settings.labels("top")
			.log()
		,
		newText("q4", "<b>Any feedback about this comic?</b> <span style='font-size: 10px; font-style: italic;'>(Typos? Lack of clarity? Something you think should be changed? Be as detailed or as broad as you want!)</span>")
			.color("blue").css("font-size","14px")
		,
		newTextInput("ComicFeedback", "")
			.color("CornflowerBlue")
			.log()
			.lines(2)
			.size(800, 30)
		,
		newVar("question", "")
		,
		getVar("question")
			.set(v => getRandomInt(2))
		,
		getVar("trialsDone")
			.set(v => v+1)
		,
		newText("prog", "")
		.text(getVar("trialsDone"))
		.css("font-size", "10px")
		.before(newText("roundNo", "Round #").css("font-size", "10px"))
		.after(newText(" of&nbsp;")
			.css("font-size", "10px")
			.after(newText("total", "").css("font-size", "10px").text(getVar("trialsTotal"))))
		,
		newButton("moveOn", "Continue")
			.css("font-size", "12px")
			.center()
		,
		newText("please-re-read", "Re-read the comic, and get ready to record the red speech bubble.")
			.css("font-size", "12px")
			.italic()
			.color("red")
		,
		newButton("nowRecord", "Ready to Record")
			.css("font-size", "12px")
			.center()
		,
		newButton("done", "Next")
			.css("font-size", "12px")
			.center()
		,
	// FIRST CANVAS
		newCanvas("questionTime", 1088, 500)
			.css("padding", "100px")
			.add("center at 50%", "top at 100px", getCanvas("comicstrip"))
			.add("center at 50%", "top at 50px", getText("prog"))
		,
		getVar("question")
			.test.is("0").success(
				getCanvas("questionTime")
				.add("center at 50%", "top at 290px", getText("q1"))
				.add("center at 50%", "top at 320px", getScale("WhoKnowsMore"))
				)
			.test.is("1").success(
				getCanvas("questionTime")
				.add("center at 50%", "top at 290px", getText("q2"))
				.add("center at 50%", "top at 320px", getScale("ChangedMind"))
				)
		,
		getCanvas("questionTime")
			.add("center at 50%", "bottom at 500px", getButton("moveOn"))
			.scaling("page")
			.print("center at 50%","top at 50px")
		,
		getButton("moveOn")
			.wait( getScale("WhoKnowsMore").test.selected() 
				.or( getScale("ChangedMind").test.selected() )
				.success(getCanvas("feedback").remove())
				.failure(
					newCanvas("feedback", "100vw", "14px")
						.add( "center at 50%", "middle at 50%", 
							newText("errorC1-s", "You must answer the question first.")
								.center()
								.color("red")
						)
					.print( "center at 50%", "top at 500px", "questionTime")
				)
			)
		,
		getCanvas("questionTime")
			.remove()
		,
	// SECOND CANVAS
		newCanvas("moreQuestions", 1088, 500)
			.css("padding", "100px")
			.add("center at 50%", "top at 100px", getCanvas("comicstrip"))
			.add("center at 50%", "top at 50px", getText("prog"))
			.add("center at 50%", "top at 290px", getText("q3"))
			.add("center at 50%", "top at 310px", getScale("MakesSense"))
			.add("center at 50%", "top at 370px", getText("q4"))
			.add("center at 50%", "top at 395px", getTextInput("ComicFeedback"))		
			.add("center at 50%", "bottom at 475px", getText("please-re-read"))
			.add("center at 50%", "bottom at 500px", getButton("nowRecord"))
			.scaling("page")
			.print("center at 50%", "top at 50px")
		,
		getButton("nowRecord")
			.wait( getScale("MakesSense").test.selected() 
				.success(getCanvas("feedback2").remove())
				.failure(
					newCanvas("feedback2", "100vw", "14px")
						.add( "center at 50%", "middle at 50%", 
							newText("errorC2-s", "You must answer the question first.")
								.center()
								.color("red")
						)
					.print( "center at 50%", "top at 500px", "moreQuestions")
				)
			)
		,
		getCanvas("moreQuestions")
			.remove()
		,
	// THIRD CANVAS
		newCanvas("recordingTime", 1088, 500)
			.css("padding", "100px")
			.add("center at 50%", "top at 100px", getCanvas("comicstrip"))
			.add("center at 50%", "top at 290px", getCanvas("recorder"))
			.scaling("page")
			.print("center at 50%", "top at 50px")
		,
		newMediaRecorder("sample1.jpg", "audio").css("font-size", "12px").log().record().print(getCanvas("recorder")).wait()
		,
		getButton("done")
			.print("center at 50%", "bottom at 500px", "recordingTime")
			.wait()
	)
	.setOption("hideProgressBar",true)
)



newTrial("final",
	exitFullscreen()
	,
	newCanvas("allDone", 1088, 500)
		.css("padding", "100px")
		.add("center at 50%", "top at 200px", 
			newText("<p>You're all done! Thank you for your participation!</p>")
			.css("font-size", "20px")
			.center()
		)
		.add("center at 50%", "bottom at 500px",
			newButton("Finish", "Finish")
			.css("font-size", "20px")
		)
		.scaling("page")
		.print("center at 50%", "top at 50px")
	,
	// Upload the recordings:
	UploadRecordings("sendAsync", "noblock")
	,
	getButton("Finish")
		.wait()
)
.setOption("hideProgressBar",true)