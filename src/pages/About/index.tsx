import React from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components/macro'
import { SwitchLocaleLink } from '../../components/SwitchLocaleLink'
import { UNI } from '../../constants/tokens'
import { ExternalLink, TYPE } from '../../theme'
import { RowBetween, RowFixed } from '../../components/Row'
import { Link } from 'react-router-dom'
import { getExplorerLink, ExplorerDataType } from '../../utils/getExplorerLink'
import { ProposalStatus } from './styled'
import { ButtonPrimary } from '../../components/Button'
import { Button } from 'rebass/styled-components'
import { darken } from 'polished'
import { CardBGImage, CardNoise, CardSection, DataCard } from '../../components/earn/styled'
import {
  ProposalData,
  ProposalState,
  useAllProposalData,
  useUserDelegatee,
  useUserVotes,
} from '../../state/governance/hooks'
import DelegateModal from '../../components/vote/DelegateModal'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks/web3'
import { ZERO_ADDRESS } from '../../constants/misc'
import { Token, CurrencyAmount } from '@uniswap/sdk-core'
import JSBI from 'jsbi'
import { shortenAddress } from '../../utils'
import Loader from '../../components/Loader'
import FormattedCurrencyAmount from '../../components/FormattedCurrencyAmount'
import { useModalOpen, useToggleDelegateModal } from '../../state/application/hooks'
import { ApplicationModal } from '../../state/application/actions'
import { Trans } from '@lingui/macro'

const PageWrapper = styled(AutoColumn)``

const TopSection = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const Proposal = styled(Button)`
  padding: 0.75rem 1rem;
  width: 100%;
  margin-top: 1rem;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 48px 1fr 120px;
  align-items: center;
  text-align: left;
  outline: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
  text-decoration: none;
  background-color: ${({ theme }) => theme.bg1};
  &:focus {
    background-color: ${({ theme }) => darken(0.05, theme.bg1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.bg1)};
  }
`

const ProposalNumber = styled.span`
  opacity: 0.6;
`

const ProposalTitle = styled.span`
  font-weight: 600;
`

const VoteCard = styled(DataCard)`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #27ae60 0%, #000000 100%);
  overflow: hidden;
`

const WrapSmall = styled(RowBetween)`
  margin-bottom: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
  `};
`

const TextButton = styled(TYPE.main)`
  color: ${({ theme }) => theme.primary1};
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const AddressButton = styled.div`
  border: 1px solid ${({ theme }) => theme.bg3};
  padding: 2px 4px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledExternalLink = styled(ExternalLink)`
  color: ${({ theme }) => theme.text1};
`

const EmptyProposals = styled.div`
  border: 1px solid ${({ theme }) => theme.text4};
  padding: 16px 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Vote() {
  const { account, chainId } = useActiveWeb3React()

  // toggle for showing delegation modal
  const showDelegateModal = useModalOpen(ApplicationModal.DELEGATE)
  const toggleDelegateModal = useToggleDelegateModal()

  // get data to list all proposals
  const allProposals: ProposalData[] = useAllProposalData()

  // user data
  const availableVotes: CurrencyAmount<Token> | undefined = useUserVotes()
  const uniBalance: CurrencyAmount<Token> | undefined = useTokenBalance(
    account ?? undefined,
    chainId ? UNI[chainId] : undefined
  )
  const userDelegatee: string | undefined = useUserDelegatee()

  // show delegation option if they have have a balance, but have not delegated
  const showUnlockVoting = Boolean(
    uniBalance && JSBI.notEqual(uniBalance.quotient, JSBI.BigInt(0)) && userDelegatee === ZERO_ADDRESS
  )

  return (
    <>
      <PageWrapper gap="lg" justify="center">
        <DelegateModal
          isOpen={showDelegateModal}
          onDismiss={toggleDelegateModal}
          title={showUnlockVoting ? <Trans>Unlock Votes</Trans> : <Trans>Update Delegation</Trans>}
        />
        <TopSection gap="md">
          <VoteCard>
            <CardBGImage />
            <CardNoise />
            <CardSection>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white fontWeight={600}>
                    <Trans>About Birbswap</Trans>
                  </TYPE.white>
                </RowBetween>
                <RowBetween>
                  <TYPE.white fontSize={14}>
                    <Trans>
                      CloutSwap is a fork of birbswap, which is forked from the Uniswap interface. CloutSwap is an
                      alternative frontend that prioritizes CloutContracts (CCS) and decentralized cryptocurrencies. It
                      also prioritizes cross-chain projects. Please consider CloutSwap and CloutContracts as
                      experimental tech and utilities. Any actions you decide to do are at your own risk. Please do not
                      consider tokens on here as an asset or financial investment, but rather a showcase of technology.
                      We do not solicit or facilitate any kind of financial or investment advice.
                    </Trans>
                  </TYPE.white>
                </RowBetween>
                <ExternalLink
                  style={{ color: 'white', textDecoration: 'underline' }}
                  href="https://cloutcontracts.net"
                  target="_blank"
                >
                  <TYPE.white fontSize={14}>
                    <Trans>Read more about CCS</Trans>
                  </TYPE.white>
                </ExternalLink>
              </AutoColumn>
            </CardSection>
            <CardBGImage />
            <CardNoise />
          </VoteCard>
        </TopSection>
      </PageWrapper>
      <SwitchLocaleLink />
    </>
  )
}
