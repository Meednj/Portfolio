import re
import urllib.request
from pathlib import Path

BASE = "https://raw.githubusercontent.com/Meednj/marjane_ems/main/"
CONTROLLERS = [
    "ems/src/main/java/com/marjane/ems/auth/AuthController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/AdminController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/AdministratorController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/AvailabilityController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/DepartmentController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/DiagnosticController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/EmployeController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/EnumController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/LeaveController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/PresenceController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/ShiftController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/TeamGroupController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/TechnicianController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/TestController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/TicketController.java",
    "ems/src/main/java/com/marjane/ems/Controllers/UserController.java",
]

HTTP_ANN = re.compile(
    r"@(Get|Post|Put|Delete|Patch)Mapping\s*(?:\(([^)]*)\))?",
    re.IGNORECASE,
)
CLASS_MAP = re.compile(r"@RequestMapping\s*\(([^)]*)\)")


def join_path(base: str, path: str) -> str:
    if not path:
        full = base or "/"
    elif path.startswith("/"):
        full = path if not base else (base.rstrip("/") + path)
    else:
        full = (base.rstrip("/") + "/" + path) if base else "/" + path
    if not full.startswith("/"):
        full = "/" + full
    return re.sub(r"/{2,}", "/", full)


def extract_paths(args: str) -> list[str]:
    if not args.strip():
        return [""]
    return re.findall(r'"([^"]*)"', args) or [""]


def class_base_path(text: str) -> str:
    match = CLASS_MAP.search(text)
    if not match:
        return ""
    args = match.group(1)
    named = re.search(r"(?:value|path)\s*=\s*\{?([^}]*)\}?", args)
    blob = named.group(1) if named else args
    paths = re.findall(r'"([^"]+)"', blob)
    return paths[0] if paths else ""


def main() -> None:
    out = Path(
        r"C:\Users\simop\.cursor\projects\c-Users-simop-Documents-My-projects-Coding-Portfolio-portfolio\agent-tools\marjane-controllers"
    )
    out.mkdir(parents=True, exist_ok=True)
    unique: dict[tuple[str, str], list[str]] = {}
    for rel in CONTROLLERS:
        url = BASE + rel.replace(" ", "%20")
        try:
            text = urllib.request.urlopen(url, timeout=30).read().decode("utf-8")
        except Exception as exc:
            print("FAIL", rel, exc)
            continue
        (out / Path(rel).name).write_text(text, encoding="utf-8")
        base = class_base_path(text)
        for match in HTTP_ANN.finditer(text):
            method = match.group(1).upper()
            for path in extract_paths(match.group(2) or ""):
                full = join_path(base, path)
                unique.setdefault((method, full), []).append(Path(rel).name)
    print("UNIQUE method+path", len(unique))
    for method, path in sorted(unique):
        print(f"{method:6} {path}")


if __name__ == "__main__":
    main()
