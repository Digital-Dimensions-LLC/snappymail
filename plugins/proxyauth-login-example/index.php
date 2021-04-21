<?php

class ProxyauthLoginExamplePlugin extends \RainLoop\Plugins\AbstractPlugin
{
	const
		NAME     = '',
		VERSION = '2.1',
		REQUIRED = '2.5.0',
		CATEGORY = 'General',
		DESCRIPTION = '';

	public function Init() : void
	{
		$this->addHook('login.success', 'EventLoginPostLoginProvide');
	}

	/**
	 * @param string $sLogin
	 * @param string $sPassword
	 */
	public function isValidAccount($sLogin, $sPassword)
	{
		return !empty($sLogin) && !empty($sPassword);
	}

	/**
	 * @param \RainLoop\Model\Account $oAccount
	 */
	public function EventLoginPostLoginProvide(&$oAccount)
	{
		if ($oAccount instanceof \RainLoop\Model\Account)
		{
			// Verify logic
			$bValid = $this->isValidAccount($oAccount->Login(), $oAccount->Password());

			/**
			 * $oAccount->Email();			// Email (It is not a IMAP login)
			 * $oAccount->Login();			// IMAP login
			 * $oAccount->Password();		// IMAP password
			 * $oAccount->DomainIncHost();  // IMAP host
			 *
			 * @see \RainLoo\Model\Account for more
			 */

			if (!$bValid) // if verify failed
			{
				// throw a Auth Error Exception
				throw new \RainLoop\Exceptions\ClientException(\RainLoop\Notifications::AuthError);
			}
			else // Or setup your proxyauth admin account credentials
			{
				$oAccount->SetProxyAuthUser('admin@domain.com');
				$oAccount->SetProxyAuthPassword('secret-admin-password');
			}
		}
	}
}
