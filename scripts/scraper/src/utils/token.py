import math
import os
import subprocess


def get_token(id: str) -> str:
    # execute javascript
    with open("/tmp/code.ts", "w") as f:
        f.write(f"console.log(((Number({id}) / 1e15) * Math.PI).toString(6 ** 2).replace(/(0+|\\.)/g, ''))")

    result = subprocess.run(["node", "/tmp/code.ts"], capture_output=True, text=True)
    os.remove("/tmp/code.ts")

    return result.stdout
