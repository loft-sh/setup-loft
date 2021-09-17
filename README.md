<p align="center">
  <a href="https://github.com/loft-sh/setup-loft/actions"><img alt="install-loft-cli status" src="https://github.com/loft-sh/setup-loft/workflows/build-test/badge.svg"></a>
</p>

# setup-loft

This is a GitHub Action to install the Loft CLI and log in to the provided Loft instance. Windows, Mac, and Linux runners are supported.

## Usage

This action will install the Loft CLI for use in job steps and automatically log in to your Loft instance. The default behavior installs the latest release from [Loft Releases](https://github.com/loft-sh/loft/releases). Subsequent steps may run any `loft` CLI command.

It is recommended that you use encrypted secrets for storing your access key. See [Access Keys](https://loft.sh/docs/auth/access-keys) for help generating a Loft access key. To configure a secret, please see the [GitHub Actions Encrypted Secrets Documentation](https://docs.github.com/en/actions/reference/encrypted-secrets). The following examples assume that you have configured secrets named `LOFT_ACCESS_KEY` and `LOFT_URL`.

To avoid leaking your Loft access key onto GitHub runners, this action will remove the `~/.loft` directory at the end of the job.

### Example: Use a specific Loft version and login
```yaml
name: loft version
on:
  push:
    branches:
      - 'main'
jobs:
  whoami:
    runs-on: ubuntu-latest
    steps:
      - name: Install Loft
        uses: loft-sh/setup-loft@main
        with:
          version: v1.14.0
          url: ${{ secrets.LOFT_URL }}
          access-key: ${{ secrets.LOFT_ACCESS_KEY }}
      - name: Show Version
        run: loft --version
      - name: Show Username
        run: loft vars username
```

## Install `kubectl`

Options are provided to install `kubectl`. Many GitHub runners now come with `kubectl` pre-installed, however this allows for controlling the version of `kubectl` if desired.

### Example: Login to loft, and install a specific kubectl version
```yaml
name: loft version
on:
  push:
    branches:
      - 'main'
jobs:
  whoami:
    runs-on: ubuntu-latest
    steps:
      - name: Install Loft
        uses: loft-sh/setup-loft@main
        with:
          url: ${{ secrets.LOFT_URL }}
          access-key: ${{ secrets.LOFT_ACCESS_KEY }}
          kubectl-install: true
          kubectl-version: v1.21.0
      - name: Show Version
        run: loft --version
      - name: Show Username
        run: loft vars username
```

## Customizing

### inputs

The following inputs can be used as `step.with` keys. 

| Name                | Type     | Description                        |
|---------------------|----------|------------------------------------|
| `version`           | String   | The version of Loft CLI to install. See [Loft Releases](https://github.com/loft-sh/loft/releases) for available versions.
| `url`          | String   | The URL used to access your Loft instance.
| `access-key`   | String   | A Loft access key used for logging in through the CLI. See [Access Keys](https://loft.sh/docs/auth/access-keys) for help generating a Loft access key.
| `insecure`          | Boolean  | Allow login into an insecure loft instance
| `docker-login`      | Boolean  | If true, will log into the docker image registries the user has image pull secrets for (default true)
| `kubectl-install`        | Boolean  | Install kubectl if not already installed
| `kubectl-version`        | String   | The version of the kubectl to install