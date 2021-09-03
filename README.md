<p align="center">
  <a href="https://github.com/lizardruss/install-loft-cli/actions"><img alt="install-loft-cli status" src="https://github.com/lizardruss/install-loft-cli/workflows/build-test/badge.svg"></a>
</p>

# Install Loft CLI GitHub Action

This is a GitHub Action to install the Loft CLI and log in to the provided Loft instance. Windows, Mac, and Linux runners are supported.

## Usage

This action will install the Loft CLI for use in job steps and automatically log in to your Loft instance. The default behavior installs the latest release from [Loft Releases](https://github.com/loft-sh/loft/releases). Subsequent steps may run any `loft` CLI command.

It is recommended that you use encrypted secrets for storing your access key. See [Access Keys](https://loft.sh/docs/auth/access-keys) for help generating a Loft access key. To configure a secret, please see the [GitHub Actions Encrypted Secrets Documentation](https://docs.github.com/en/actions/reference/encrypted-secrets). The following examples assume that you have configured a secret named `LOFT_ACCESS_KEY`.

### Example: Use a specific Loft Version and Login
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
        uses: lizardruss/install-loft-cli
        with:
          version: v1.14.0
          loft-url: ${{ secrets.LOFT_URL }}
          loft-access-key: ${{ secrets.LOFT_ACCESS_KEY }}
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
| `loft-access-key`        | String   | A Loft access key used for logging in through the CLI. See [Access Keys](https://loft.sh/docs/auth/access-keys) for help generating a Loft access key.
| `loft-url`          | String   | The URL used to access your Loft instance.