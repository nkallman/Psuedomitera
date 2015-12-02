if (window.jQuery) {
(function($) {
$(document).ready(function(){

	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        var cmd_string = getCommand();
	        var pre = getCLIPrompt();
			println(escapeHtml(pre+" "+cmd_string), "p");

			clearCommand();
			
			var cmd = cli_parse(cmd_string);

			cli(cmd);
	    }
	});

	function getCommand() {
		var cmd = $("#cli-field").val();
		return cmd;
	}

	function getCLIPrompt() {
		var pre = $("#cli-field-lable").html();
		return pre;
	}

	function clearCommand() {
		$("#cli-field").val('');
	}

	function cli_parse(cmd_string) {
		var ignoreSpace = false;
		var brk = false;
		var str = "";
		var chr = '';
		var cmd = [];
		var done = false;

		while (!done) {
			cmd_string.trim();
			brk = false;
			while (!brk) {

				if (cmd_string.length == 1) {
					brk = true;
					done = true;
				}

				chr = cmd_string.substring(0,1);
				cmd_string = cmd_string.substring(1);

				if (!ignoreSpace) {
					if (chr == "\s") {
						brk = true;
					}
					else if (chr == "\"") {
						ignoreSpace = true;
					}
					else {
						str += chr;
					}
				}
				else {
					if (chr == "\"") {
						ignoreSpace = true;
						brk = true;
					}
					else {
						str += chr;
					}
				}
			}
			cmd.push(str);
		}

		return cmd;
	}

	function cli(command) {
		for (var i = 1; i < command.length; i++) {
			println(command[i], "p");
		}
	}

	function println(string, tag) {
		var pre = document.createElement(tag); 
		pre.style.wordWrap = "break-word"; 
		pre.innerHTML = string;
		$("output").append(pre); 
	}

	function escapeHtml(string) {
		var entityMap = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': '&quot;',
			"'": '&#39;',
			"/": '&#x2F;'
		};

		return String(string).replace(/[&<>"'\/]/g, function (s) {
			return entityMap[s];
		});
	}

	function refocus() {
		$("#cli-field").focus();
	}

	refocus();

});
}(jQuery));
}
else {
	alert("This needs jQuery");
}