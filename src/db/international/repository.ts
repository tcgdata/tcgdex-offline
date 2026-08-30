const loadSeries = async (): Promise<Array<any>> => {
  return (
    await import('./series.json', {
      with: { type: 'json' },
    })
  ).default;
};

const loadSetsBySeriesId = async (seriesId: string): Promise<Array<any> | undefined> => {
  switch (seriesId) {
    case 'xy':
      return (
        await import('./sets/xy.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm':
      return (
        await import('./sets/sm.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk':
      return (
        await import('./sets/tk.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh':
      return (
        await import('./sets/swsh.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pl':
      return (
        await import('./sets/pl.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tcgp':
      return (
        await import('./sets/tcgp.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv':
      return (
        await import('./sets/sv.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pop':
      return (
        await import('./sets/pop.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'neo':
      return (
        await import('./sets/neo.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'misc':
      return (
        await import('./sets/misc.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'me':
      return (
        await import('./sets/me.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'lc':
      return (
        await import('./sets/lc.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'hgss':
      return (
        await import('./sets/hgss.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'gym':
      return (
        await import('./sets/gym.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'mc':
      return (
        await import('./sets/mc.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'col':
      return (
        await import('./sets/col.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'dp':
      return (
        await import('./sets/dp.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ecard':
      return (
        await import('./sets/ecard.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'base':
      return (
        await import('./sets/base.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex':
      return (
        await import('./sets/ex.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw':
      return (
        await import('./sets/bw.json', {
          with: { type: 'json' },
        })
      ).default;
  }
};

const loadCardsBySetId = async (setId: string): Promise<Array<any> | undefined> => {
  switch (setId) {
    case 'xya':
      return (
        await import('./cards/xy/xya.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy1':
      return (
        await import('./cards/xy/xy1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xyp':
      return (
        await import('./cards/xy/xyp.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy6':
      return (
        await import('./cards/xy/xy6.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy4':
      return (
        await import('./cards/xy/xy4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy11':
      return (
        await import('./cards/xy/xy11.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy0':
      return (
        await import('./cards/xy/xy0.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy5':
      return (
        await import('./cards/xy/xy5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy2':
      return (
        await import('./cards/xy/xy2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'g1':
      return (
        await import('./cards/xy/g1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy3':
      return (
        await import('./cards/xy/xy3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'dc1':
      return (
        await import('./cards/xy/dc1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy10':
      return (
        await import('./cards/xy/xy10.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy12':
      return (
        await import('./cards/xy/xy12.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy7':
      return (
        await import('./cards/xy/xy7.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy9':
      return (
        await import('./cards/xy/xy9.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'xy8':
      return (
        await import('./cards/xy/xy8.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm10':
      return (
        await import('./cards/sm/sm10.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm11':
      return (
        await import('./cards/sm/sm11.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm5':
      return (
        await import('./cards/sm/sm5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm9':
      return (
        await import('./cards/sm/sm9.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm3.5':
      return (
        await import('./cards/sm/sm3.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm1':
      return (
        await import('./cards/sm/sm1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sma':
      return (
        await import('./cards/sm/sma.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'smp':
      return (
        await import('./cards/sm/smp.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm115':
      return (
        await import('./cards/sm/sm115.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm8':
      return (
        await import('./cards/sm/sm8.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm6':
      return (
        await import('./cards/sm/sm6.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm2':
      return (
        await import('./cards/sm/sm2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'det1':
      return (
        await import('./cards/sm/det1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm7.5':
      return (
        await import('./cards/sm/sm7.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm4':
      return (
        await import('./cards/sm/sm4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm7':
      return (
        await import('./cards/sm/sm7.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm3':
      return (
        await import('./cards/sm/sm3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-xy-sy':
      return (
        await import('./cards/tk/tk-xy-sy.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-xy-w':
      return (
        await import('./cards/tk/tk-xy-w.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-xy-p':
      return (
        await import('./cards/tk/tk-xy-p.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-xy-su':
      return (
        await import('./cards/tk/tk-xy-su.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sm12':
      return (
        await import('./cards/sm/sm12.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-xy-latio':
      return (
        await import('./cards/tk/tk-xy-latio.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-xy-latia':
      return (
        await import('./cards/tk/tk-xy-latia.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-xy-n':
      return (
        await import('./cards/tk/tk-xy-n.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-sm-l':
      return (
        await import('./cards/tk/tk-sm-l.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-hs-r':
      return (
        await import('./cards/tk/tk-hs-r.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-ex-p':
      return (
        await import('./cards/tk/tk-ex-p.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-sm-r':
      return (
        await import('./cards/tk/tk-sm-r.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-xy-b':
      return (
        await import('./cards/tk/tk-xy-b.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-ex-m':
      return (
        await import('./cards/tk/tk-ex-m.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-ex-latio':
      return (
        await import('./cards/tk/tk-ex-latio.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-hs-g':
      return (
        await import('./cards/tk/tk-hs-g.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-dp-m':
      return (
        await import('./cards/tk/tk-dp-m.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-dp-l':
      return (
        await import('./cards/tk/tk-dp-l.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-ex-latia':
      return (
        await import('./cards/tk/tk-ex-latia.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-bw-e':
      return (
        await import('./cards/tk/tk-bw-e.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'tk-bw-z':
      return (
        await import('./cards/tk/tk-bw-z.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh12tg':
      return (
        await import('./cards/swsh/swsh12tg.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh1':
      return (
        await import('./cards/swsh/swsh1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh4':
      return (
        await import('./cards/swsh/swsh4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh4.5':
      return (
        await import('./cards/swsh/swsh4.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh12':
      return (
        await import('./cards/swsh/swsh12.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh4.5sv':
      return (
        await import('./cards/swsh/swsh4.5sv.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'fut2020':
      return (
        await import('./cards/swsh/fut2020.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh10.5':
      return (
        await import('./cards/swsh/swsh10.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh11tg':
      return (
        await import('./cards/swsh/swsh11tg.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh2':
      return (
        await import('./cards/swsh/swsh2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swshp':
      return (
        await import('./cards/swsh/swshp.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh11':
      return (
        await import('./cards/swsh/swsh11.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh3':
      return (
        await import('./cards/swsh/swsh3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh12.5gg':
      return (
        await import('./cards/swsh/swsh12.5gg.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh7':
      return (
        await import('./cards/swsh/swsh7.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh12.5':
      return (
        await import('./cards/swsh/swsh12.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh8':
      return (
        await import('./cards/swsh/swsh8.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh6':
      return (
        await import('./cards/swsh/swsh6.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh3.5':
      return (
        await import('./cards/swsh/swsh3.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'cel25cc':
      return (
        await import('./cards/swsh/cel25cc.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'cel25':
      return (
        await import('./cards/swsh/cel25.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh9tg':
      return (
        await import('./cards/swsh/swsh9tg.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh10tg':
      return (
        await import('./cards/swsh/swsh10tg.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh5':
      return (
        await import('./cards/swsh/swsh5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh10':
      return (
        await import('./cards/swsh/swsh10.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'swsh9':
      return (
        await import('./cards/swsh/swsh9.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pl3':
      return (
        await import('./cards/pl/pl3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ru1':
      return (
        await import('./cards/pl/ru1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pl2':
      return (
        await import('./cards/pl/pl2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pl4':
      return (
        await import('./cards/pl/pl4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pl1':
      return (
        await import('./cards/pl/pl1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'A2a':
      return (
        await import('./cards/tcgp/A2a.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'A2b':
      return (
        await import('./cards/tcgp/A2b.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'A4':
      return (
        await import('./cards/tcgp/A4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'A4a':
      return (
        await import('./cards/tcgp/A4a.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'A2':
      return (
        await import('./cards/tcgp/A2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'P-A':
      return (
        await import('./cards/tcgp/P-A.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'A1a':
      return (
        await import('./cards/tcgp/A1a.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'B2a':
      return (
        await import('./cards/tcgp/B2a.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'B2':
      return (
        await import('./cards/tcgp/B2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'A3a':
      return (
        await import('./cards/tcgp/A3a.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'A1':
      return (
        await import('./cards/tcgp/A1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'A3b':
      return (
        await import('./cards/tcgp/A3b.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'B1a':
      return (
        await import('./cards/tcgp/B1a.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'B1':
      return (
        await import('./cards/tcgp/B1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv10.5w':
      return (
        await import('./cards/sv/sv10.5w.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'A3':
      return (
        await import('./cards/tcgp/A3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv05':
      return (
        await import('./cards/sv/sv05.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv06':
      return (
        await import('./cards/sv/sv06.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sve':
      return (
        await import('./cards/sv/sve.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv06.5':
      return (
        await import('./cards/sv/sv06.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv08':
      return (
        await import('./cards/sv/sv08.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv07':
      return (
        await import('./cards/sv/sv07.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv01':
      return (
        await import('./cards/sv/sv01.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'svp':
      return (
        await import('./cards/sv/svp.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv08.5':
      return (
        await import('./cards/sv/sv08.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv04':
      return (
        await import('./cards/sv/sv04.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'mfb':
      return (
        await import('./cards/sv/mfb.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv02':
      return (
        await import('./cards/sv/sv02.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv04.5':
      return (
        await import('./cards/sv/sv04.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv03':
      return (
        await import('./cards/sv/sv03.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv09':
      return (
        await import('./cards/sv/sv09.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv03.5':
      return (
        await import('./cards/sv/sv03.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv10.5b':
      return (
        await import('./cards/sv/sv10.5b.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pop9':
      return (
        await import('./cards/pop/pop9.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'sv10':
      return (
        await import('./cards/sv/sv10.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pop8':
      return (
        await import('./cards/pop/pop8.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pop7':
      return (
        await import('./cards/pop/pop7.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pop6':
      return (
        await import('./cards/pop/pop6.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pop5':
      return (
        await import('./cards/pop/pop5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pop3':
      return (
        await import('./cards/pop/pop3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pop4':
      return (
        await import('./cards/pop/pop4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'np':
      return (
        await import('./cards/pop/np.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pop1':
      return (
        await import('./cards/pop/pop1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'pop2':
      return (
        await import('./cards/pop/pop2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'si1':
      return (
        await import('./cards/neo/si1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'neo3':
      return (
        await import('./cards/neo/neo3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'miscp':
      return (
        await import('./cards/misc/miscp.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'neo1':
      return (
        await import('./cards/neo/neo1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'neo4':
      return (
        await import('./cards/neo/neo4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'neo2':
      return (
        await import('./cards/neo/neo2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'mee':
      return (
        await import('./cards/me/mee.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'me05':
      return (
        await import('./cards/me/me05.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'me03':
      return (
        await import('./cards/me/me03.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'me02':
      return (
        await import('./cards/me/me02.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'mep':
      return (
        await import('./cards/me/mep.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'lc':
      return (
        await import('./cards/lc/lc.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'me01':
      return (
        await import('./cards/me/me01.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'me04':
      return (
        await import('./cards/me/me04.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'hgss3':
      return (
        await import('./cards/hgss/hgss3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'hgss2':
      return (
        await import('./cards/hgss/hgss2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'hgssp':
      return (
        await import('./cards/hgss/hgssp.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'hgss4':
      return (
        await import('./cards/hgss/hgss4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'me02.5':
      return (
        await import('./cards/me/me02.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2024sv':
      return (
        await import('./cards/mc/2024sv.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'hgss1':
      return (
        await import('./cards/hgss/hgss1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'gym1':
      return (
        await import('./cards/gym/gym1.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2023sv':
      return (
        await import('./cards/mc/2023sv.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2022swsh':
      return (
        await import('./cards/mc/2022swsh.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'gym2':
      return (
        await import('./cards/gym/gym2.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2019sm':
      return (
        await import('./cards/mc/2019sm.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2018sm':
      return (
        await import('./cards/mc/2018sm.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2017sm':
      return (
        await import('./cards/mc/2017sm.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2016xy':
      return (
        await import('./cards/mc/2016xy.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2015xy':
      return (
        await import('./cards/mc/2015xy.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2014xy':
      return (
        await import('./cards/mc/2014xy.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2021swsh':
      return (
        await import('./cards/mc/2021swsh.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2012bw':
      return (
        await import('./cards/mc/2012bw.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2011bw':
      return (
        await import('./cards/mc/2011bw.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2019sm-fr':
      return (
        await import('./cards/mc/2019sm-fr.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2013bw':
      return (
        await import('./cards/mc/2013bw.json', {
          with: { type: 'json' },
        })
      ).default;

    case '2018sm-fr':
      return (
        await import('./cards/mc/2018sm-fr.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'col1':
      return (
        await import('./cards/col/col1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'dp7':
      return (
        await import('./cards/dp/dp7.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'dp3':
      return (
        await import('./cards/dp/dp3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'dp5':
      return (
        await import('./cards/dp/dp5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'dp4':
      return (
        await import('./cards/dp/dp4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'dpp':
      return (
        await import('./cards/dp/dpp.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'dp1':
      return (
        await import('./cards/dp/dp1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'dp2':
      return (
        await import('./cards/dp/dp2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'dp6':
      return (
        await import('./cards/dp/dp6.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bog':
      return (
        await import('./cards/ecard/bog.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ecard1':
      return (
        await import('./cards/ecard/ecard1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'basep':
      return (
        await import('./cards/base/basep.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ecard2':
      return (
        await import('./cards/ecard/ecard2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ecard3':
      return (
        await import('./cards/ecard/ecard3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'base3':
      return (
        await import('./cards/base/base3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'base5':
      return (
        await import('./cards/base/base5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'base4':
      return (
        await import('./cards/base/base4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'base2':
      return (
        await import('./cards/base/base2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'exu':
      return (
        await import('./cards/ex/exu.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'base1':
      return (
        await import('./cards/base/base1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex7':
      return (
        await import('./cards/ex/ex7.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex10':
      return (
        await import('./cards/ex/ex10.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex1':
      return (
        await import('./cards/ex/ex1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex16':
      return (
        await import('./cards/ex/ex16.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex5.5':
      return (
        await import('./cards/ex/ex5.5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex2':
      return (
        await import('./cards/ex/ex2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex4':
      return (
        await import('./cards/ex/ex4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex12':
      return (
        await import('./cards/ex/ex12.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex13':
      return (
        await import('./cards/ex/ex13.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex5':
      return (
        await import('./cards/ex/ex5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex9':
      return (
        await import('./cards/ex/ex9.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex3':
      return (
        await import('./cards/ex/ex3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex8':
      return (
        await import('./cards/ex/ex8.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex6':
      return (
        await import('./cards/ex/ex6.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex15':
      return (
        await import('./cards/ex/ex15.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex14':
      return (
        await import('./cards/ex/ex14.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'ex11':
      return (
        await import('./cards/ex/ex11.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw3':
      return (
        await import('./cards/bw/bw3.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw9':
      return (
        await import('./cards/bw/bw9.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw10':
      return (
        await import('./cards/bw/bw10.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw8':
      return (
        await import('./cards/bw/bw8.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw2':
      return (
        await import('./cards/bw/bw2.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw4':
      return (
        await import('./cards/bw/bw4.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw11':
      return (
        await import('./cards/bw/bw11.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw6':
      return (
        await import('./cards/bw/bw6.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'dv1':
      return (
        await import('./cards/bw/dv1.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw7':
      return (
        await import('./cards/bw/bw7.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw5':
      return (
        await import('./cards/bw/bw5.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bwp':
      return (
        await import('./cards/bw/bwp.json', {
          with: { type: 'json' },
        })
      ).default;

    case 'bw1':
      return (
        await import('./cards/bw/bw1.json', {
          with: { type: 'json' },
        })
      ).default;
  }
};

export const repository = { loadSeries, loadSetsBySeriesId, loadCardsBySetId };
