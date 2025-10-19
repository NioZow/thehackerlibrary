{
  description = "TheHackerLibrary environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        buildInputs = with pkgs; [
            nodejs_20
            pnpm
            git
            sqlite
        ];
      in
      {
        devShells.default = pkgs.mkShell {
          inherit buildInputs;
          name = "thehackerlibrary";

          shellHook = ''
            if [ -f pnpm-lock.yaml ]; then
              if [ ! -d node_modules ] || [ "$(stat -c %Y pnpm-lock.yaml)" -gt "$(stat -c %Y node_modules 2>/dev/null || echo 0)" ]; then
                echo "pnpm-lock.yaml found and node_modules needs update or is missing. Running pnpm install..."
                pnpm install --frozen-lockfile
              else
                echo "pnpm-lock.yaml found. node_modules is up-to-date."
              fi
            else
              echo "No common lock file (pnpm-lock.yaml, yarn.lock, package-lock.json) found."
              echo "Please ensure you have run your package manager's install command at least once, or create one."
            fi

            # add .bin to PATH so local node_modules executables are available
            # e.g., `next`, `jest`, `eslint`, etc.
            export PATH=$PWD/node_modules/.bin:$PATH
            export name="thehackerlibrary"
          '';
        };
      }
    );
}
