# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{pkgs}: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.zulu
  ];
  # Sets environment variables in the workspace
  env = { NEXT_PUBLIC_FIREBASE_API_KEY = "AIzaSyA53FGtCMKPFS50rl-egSZMeVYJ_RhEhsU";
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "codeex-ai-v3.firebaseapp.com";
    NEXT_PUBLIC_FIREBASE_PROJECT_ID = "codeex-ai-v3";
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "codeex-ai-v3.firebasestorage.app";
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "180880740597";
    NEXT_PUBLIC_FIREBASE_APP_ID = "1:180880740597:web:6397845be218ba33b7f5bc";
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "G-ZQQRX5CZ1R";
  };
  # This adds a file watcher to startup the firebase emulators. The emulators will only start if
  # a firebase.json file is written into the user's directory
  services.firebase.emulators = {
    # Disabling because we are using prod backends right now
    detect = false;
    projectId = "demo-app";
    services = ["auth" "firestore"];
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];
    workspace = {
      onCreate = {
        default.openFiles = [
          "src/app/page.tsx"
        ];
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
