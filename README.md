# creative-garden portal site

creative-garden ドメイン配下で公開している各サブドメインの WEB ツールをまとめるための、静的なポータルサイトです。

## ローカルプレビュー方法

このサイトは `index.html` と `styles.css` だけで動く静的サイトなので、ローカル PC でも簡単に確認できます。

### 方法 1: ブラウザで直接開く

1. このリポジトリをローカル PC にダウンロード、または clone します。
2. `index.html` をブラウザにドラッグ & ドロップするか、ダブルクリックで開きます。

手軽に見た目を確認したい場合はこの方法で十分です。

### 方法 2: ローカルサーバーで開く（推奨）

リンクや相対パスの動作を本番に近い形で確認したい場合は、ローカルサーバーでのプレビューを推奨します。

`cd creative-garden-portal-site` は、`creative-garden-portal-site` フォルダを置いた場所の直下で実行します。
たとえば `Downloads` に置いた場合は、先に `cd ~/Downloads` で移動してから実行します。
すでにターミナルが `creative-garden-portal-site` フォルダ内にいる場合は、`cd creative-garden-portal-site` は不要です。

```bash
# 例: creative-garden-portal-site を Downloads に置いた場合
cd ~/Downloads
cd creative-garden-portal-site
python3 -m http.server 4173
```

現在いる場所が分からない場合は、次のコマンドで確認できます。

```bash
pwd
```

起動後、ブラウザで次の URL を開きます。

```text
http://localhost:4173/
```

Windows で `python3` コマンドが使えない場合は、次のコマンドを試してください。

```bash
py -m http.server 4173
```

確認が終わったら、ターミナルで `Ctrl + C` を押してサーバーを停止します。

## 掲載内容の差し替え

各ツールカードの名前、紹介文、サムネイル表示、リンク先は `index.html` の `#tools` セクションで編集できます。

```html
<a class="card-link" href="https://idea.creative-garden.example" aria-label="Idea Note を開く">
  サイトを開く <span>→</span>
</a>
```

上記のような `href` を、実際に公開している creative-garden のサブドメイン URL に差し替えてください。

## Windows: `D:\Antigravity\projects` 配下に clone する

この作業環境から、ユーザーのローカル PC の `D:\Antigravity\projects` へ直接 clone することはできません。
ローカル PC の PowerShell または Git Bash で、次の手順を実行してください。

### PowerShell の場合

```powershell
New-Item -ItemType Directory -Force -Path "D:\Antigravity\projects"
Set-Location "D:\Antigravity\projects"
git clone <このGitHubリポジトリのURL> creative-garden-portal-site
Set-Location "D:\Antigravity\projects\creative-garden-portal-site"
python -m http.server 4173
```

起動後、ブラウザで次の URL を開きます。

```text
http://localhost:4173/
```

### Git Bash の場合

```bash
mkdir -p /d/Antigravity/projects
cd /d/Antigravity/projects
git clone <このGitHubリポジトリのURL> creative-garden-portal-site
cd creative-garden-portal-site
python3 -m http.server 4173
```

`<このGitHubリポジトリのURL>` は、GitHub の対象リポジトリページにある `Code` ボタンからコピーした HTTPS または SSH の URL に置き換えてください。

## Troubleshooting: `fatal: not a git repository` が出る場合

PowerShell で次のようなエラーが出る場合は、現在いる場所が Git リポジトリのフォルダではありません。

```text
fatal: not a git repository (or any of the parent directories): .git
```

たとえば `PS D:\>` と表示されている場合、現在地は D ドライブ直下です。
`git remote -v` は、`.git` フォルダが存在するプロジェクトフォルダ内で実行する必要があります。

まず、プロジェクトを置いたフォルダへ移動してください。

```powershell
cd D:\Antigravity\projects\creative-garden-portal-site
```

移動できたか確認します。

```powershell
pwd
```

次のように表示されれば OK です。

```text
Path
----
D:\Antigravity\projects\creative-garden-portal-site
```

その後で、Git の状態や remote を確認します。

```powershell
git status
git remote -v
```

もし `D:\Antigravity\projects\creative-garden-portal-site` が存在しない場合は、まだ clone できていない可能性があります。
その場合は `D:\Antigravity\projects` 配下で `git clone` から実行してください。
