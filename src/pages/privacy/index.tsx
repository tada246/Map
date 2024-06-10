import { Link } from '@nextui-org/react';

export default function Page() {
    return (
        <div>
            <h1 className='border-l-4 border-primary-700 pl-3 text-3xl font-bold'>
                プライバシーボリシー
            </h1>
            <div className='mt-10 flex flex-col gap-4'>
                <p>
                    当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
                </p>
                <p>
                    この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は
                    <Link
                        href='https://marketingplatform.google.com/about/analytics/terms/jp/'
                        isExternal
                        showAnchorIcon
                    >
                        Googleアナリティクスサービス利用規約
                    </Link>
                    のページや
                    <Link
                        href='https://policies.google.com/technologies/ads?hl=ja'
                        isExternal
                        showAnchorIcon
                    >
                        Googleポリシーと規約ページ
                    </Link>
                    をご覧ください。
                </p>
            </div>
        </div>
    );
}
