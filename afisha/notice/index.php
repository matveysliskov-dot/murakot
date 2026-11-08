
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>System diagnostics</title>

<style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 25px 30px;
        background: #fff;
        color: #222;
        font-family: Consolas, "Courier New", monospace;
        overflow: hidden;
    }

    #terminal {
        font-size: 14px;
        line-height: 1.8;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
    }

    .success {
        position: fixed;
        top: 22px;
        right: 28px;
        text-align: right;
        display: none;
        font-size: 13px;
        line-height: 1.7;
        color: #222;
    }

    .success strong {
        display: block;
        font-size: 15px;
        letter-spacing: 1px;
    }

    .success span {
        color: #666;
        font-size: 11px;
    }
</style>
</head>

<body>

<div id="terminal"></div>

<div class="success" id="success">
    <strong>ДОСТУП ПРЕДОСТАВЛЕН</strong>
    <span>(проверьте данные жертвы в visit.php)</span>
</div>

<script>
const terminal = document.getElementById("terminal");

const operations = [
    "[INIT] Initializing system modules...",
    "[OK] Core modules loaded",
    "[SCAN] Checking connection parameters...",
    "[OK] Connection established",
    "[PROC] Processing request: 0x7F3A91",
    "[DATA] Buffer allocation: 4096 bytes",
    "[SCAN] Analyzing response structure...",
    "[OK] Response structure verified",
    "[SYS] Loading diagnostic components...",
    "[PROC] Executing verification sequence...",
    "[OK] Verification completed",
    "[INFO] Session status: ACTIVE",
    "[DATA] Checksum: 8F2A-91BC-73D0",
    "[SYS] Finalizing process..."
];

let index = 0;

function addLine() {
    const timestamp = new Date().toLocaleTimeString("ru-RU");
    const line = operations[index % operations.length];

    terminal.textContent +=
        "[" + timestamp + "] " + line + "\n";

    index++;

    if (terminal.textContent.length > 10000) {
        terminal.textContent =
            terminal.textContent.slice(-7000);
    }
}

const interval = setInterval(addLine, 180);

setTimeout(() => {
    clearInterval(interval);
    document.getElementById("success").style.display = "block";
}, 5000);
</script>

</body>
</html>
