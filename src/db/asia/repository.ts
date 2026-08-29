const loadSeries = async (): Promise<Array<any>> => {
    return (await import("./series.json", {
      with: { type: 'json' } 
    })).default;
  };
  
  const loadSeriesById = async (id: string): Promise<any> => {
    const series = await import("./series.json", {
      with: { type: 'json' } 
    });
    return series.default.find((item: any) => item.id === id);
  };
  
  const loadSetsBySeriesId = async (seriesId: string): Promise<Array<any>> => {
    switch (seriesId) {
      
        case "neo":
          return (await import("./sets/neo.json", {
            with: { type: 'json' } 
          })).default;
      
        case "XYb":
          return (await import("./sets/XYb.json", {
            with: { type: 'json' } 
          })).default;
      
        case "web":
          return (await import("./sets/web.json", {
            with: { type: 'json' } 
          })).default;
      
        case "XY":
          return (await import("./sets/XY.json", {
            with: { type: 'json' } 
          })).default;
      
        case "VS":
          return (await import("./sets/VS.json", {
            with: { type: 'json' } 
          })).default;
      
        case "e":
          return (await import("./sets/e.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV":
          return (await import("./sets/SV.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM":
          return (await import("./sets/SM.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PMCG":
          return (await import("./sets/PMCG.json", {
            with: { type: 'json' } 
          })).default;
      
        case "misc":
          return (await import("./sets/misc.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PCG":
          return (await import("./sets/PCG.json", {
            with: { type: 'json' } 
          })).default;
      
        case "L":
          return (await import("./sets/L.json", {
            with: { type: 'json' } 
          })).default;
      
        case "M":
          return (await import("./sets/M.json", {
            with: { type: 'json' } 
          })).default;
      
        case "ADV":
          return (await import("./sets/ADV.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S":
          return (await import("./sets/S.json", {
            with: { type: 'json' } 
          })).default;
      
    }
    
    throw new Error(`Cannot load set for unknown series "${seriesId}".`);
  };
  
  const loadSetById = async (id: string): Promise<any> => {
    let sets;
  
    switch (id) {
      
        case "neo4":
      
        case "neo3":
      
        case "neo2":
      
        case "neo1":
      
          sets = (await import("./sets/neo.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
          sets = (await import("./sets/XYb.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
        case "web1":
      
          sets = (await import("./sets/web.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
        case "CP2":
      
        case "CP1":
      
          sets = (await import("./sets/XY.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
        case "VS1":
      
          sets = (await import("./sets/VS.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
        case "E5":
      
        case "E4":
      
        case "E3":
      
        case "E2":
      
        case "E1":
      
          sets = (await import("./sets/e.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
        case "SVP1":
      
        case "SVLS":
      
        case "SVLN":
      
        case "SVK":
      
        case "SVHM":
      
        case "SVHK":
      
        case "SVF":
      
        case "SVEM":
      
        case "SVEL":
      
        case "SVDs":
      
        case "SVD":
      
        case "SVC":
      
        case "SVB":
      
        case "SVAW":
      
        case "SVAM":
      
        case "SVAL":
      
        case "SV9s":
      
        case "SV9a":
      
        case "SV9":
      
        case "SV8s":
      
        case "SV8a":
      
        case "SV8":
      
        case "SV7s":
      
        case "SV7a":
      
        case "SV7":
      
        case "SV6s":
      
        case "SV6a":
      
        case "SV6":
      
        case "SV5s":
      
        case "SV5a":
      
        case "SV5M":
      
        case "SV5K":
      
        case "SV4s":
      
        case "SV4a":
      
        case "SV4M":
      
        case "SV4K":
      
        case "SV3s":
      
        case "SV3a":
      
        case "SV3":
      
        case "SV2a":
      
        case "SV2P":
      
        case "SV2D":
      
        case "SV1a":
      
        case "SV1V":
      
        case "SV1S":
      
        case "SV11W":
      
        case "SV11B":
      
        case "SV10":
      
        case "SV-P":
      
          sets = (await import("./sets/SV.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
        case "SM9b":
      
        case "SM9a":
      
        case "SM9":
      
        case "SM8b":
      
        case "SM8a":
      
        case "SM8":
      
        case "SM7b":
      
        case "SM7a":
      
        case "SM7":
      
        case "SM6b":
      
        case "SM6a":
      
        case "SM6":
      
        case "SM5p":
      
        case "SM5S":
      
        case "SM5M":
      
        case "SM4p":
      
        case "SM4S":
      
        case "SM4A":
      
        case "SM3p":
      
        case "SM3N":
      
        case "SM3H":
      
        case "SM2p":
      
        case "SM2L":
      
        case "SM2K":
      
        case "SM1p":
      
        case "SM1S":
      
        case "SM1M":
      
        case "SM12a":
      
        case "SM12":
      
        case "SM11b":
      
        case "SM11a":
      
        case "SM11":
      
        case "SM10b":
      
        case "SM10a":
      
        case "SM10":
      
        case "CSMPiC":
      
          sets = (await import("./sets/SM.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
        case "PMCG6":
      
        case "PMCG5":
      
        case "PMCG4":
      
        case "PMCG3":
      
        case "PMCG2":
      
        case "PMCG1":
      
          sets = (await import("./sets/PMCG.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
        case "Miscellaneous Promos":
      
          sets = (await import("./sets/misc.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
        case "PCG9":
      
        case "PCG8":
      
        case "PCG7":
      
        case "PCG6":
      
        case "PCG5":
      
        case "PCG4":
      
        case "PCG3":
      
        case "PCG2":
      
        case "PCG1":
      
          sets = (await import("./sets/PCG.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
          sets = (await import("./sets/L.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
        case "MC":
      
        case "M6":
      
        case "M5":
      
        case "M4":
      
        case "M3":
      
        case "M2a":
      
        case "M2":
      
        case "M1S":
      
        case "M1L":
      
        case "M-P":
      
          sets = (await import("./sets/M.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
          sets = (await import("./sets/ADV.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
        case "SPZ":
      
        case "SPD":
      
        case "SP6":
      
        case "SP5":
      
        case "SN":
      
        case "SLL":
      
        case "SLD":
      
        case "SK":
      
        case "SJ":
      
        case "SI":
      
        case "SH":
      
        case "SDP":
      
        case "SDM":
      
        case "SDL":
      
        case "SCD":
      
        case "SCC":
      
        case "SCB":
      
        case "SCA":
      
        case "SC2b":
      
        case "SC2a":
      
        case "SC2D":
      
        case "SC1b":
      
        case "SC1a":
      
        case "SC1D":
      
        case "S9a":
      
        case "S9":
      
        case "S8b":
      
        case "S8a":
      
        case "S8":
      
        case "S7R":
      
        case "S7D":
      
        case "S6a":
      
        case "S6K":
      
        case "S6H":
      
        case "S5a":
      
        case "S5R":
      
        case "S5I":
      
        case "S4a":
      
        case "S4":
      
        case "S12a":
      
        case "S12":
      
        case "S11a":
      
        case "S11":
      
        case "S10b":
      
        case "S10a":
      
        case "S10P":
      
        case "S10D":
      
        case "S-P":
      
          sets = (await import("./sets/S.json", {
            with: { type: 'json' } 
          })).default;
          break;
      
    }
    
    return sets?.find((item: any) => item.id === id);
  };
  
  const loadCardsBySetId = async (setId: string): Promise<Array<any>> => {
    switch (setId) {
      
        case "neo3":
          return (await import("./cards/neo/neo3.json", {
            with: { type: 'json' } 
          })).default;
      
        case "neo2":
          return (await import("./cards/neo/neo2.json", {
            with: { type: 'json' } 
          })).default;
      
        case "neo4":
          return (await import("./cards/neo/neo4.json", {
            with: { type: 'json' } 
          })).default;
      
        case "web1":
          return (await import("./cards/web/web1.json", {
            with: { type: 'json' } 
          })).default;
      
        case "neo1":
          return (await import("./cards/neo/neo1.json", {
            with: { type: 'json' } 
          })).default;
      
        case "CP2":
          return (await import("./cards/XY/CP2.json", {
            with: { type: 'json' } 
          })).default;
      
        case "CP1":
          return (await import("./cards/XY/CP1.json", {
            with: { type: 'json' } 
          })).default;
      
        case "VS1":
          return (await import("./cards/VS/VS1.json", {
            with: { type: 'json' } 
          })).default;
      
        case "E5":
          return (await import("./cards/e/E5.json", {
            with: { type: 'json' } 
          })).default;
      
        case "E4":
          return (await import("./cards/e/E4.json", {
            with: { type: 'json' } 
          })).default;
      
        case "E3":
          return (await import("./cards/e/E3.json", {
            with: { type: 'json' } 
          })).default;
      
        case "E2":
          return (await import("./cards/e/E2.json", {
            with: { type: 'json' } 
          })).default;
      
        case "E1":
          return (await import("./cards/e/E1.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVP1":
          return (await import("./cards/SV/SVP1.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVLS":
          return (await import("./cards/SV/SVLS.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVLN":
          return (await import("./cards/SV/SVLN.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVK":
          return (await import("./cards/SV/SVK.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVHM":
          return (await import("./cards/SV/SVHM.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVHK":
          return (await import("./cards/SV/SVHK.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVEM":
          return (await import("./cards/SV/SVEM.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVF":
          return (await import("./cards/SV/SVF.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVEL":
          return (await import("./cards/SV/SVEL.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVD":
          return (await import("./cards/SV/SVD.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVDs":
          return (await import("./cards/SV/SVDs.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVC":
          return (await import("./cards/SV/SVC.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVB":
          return (await import("./cards/SV/SVB.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVAW":
          return (await import("./cards/SV/SVAW.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVAM":
          return (await import("./cards/SV/SVAM.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SVAL":
          return (await import("./cards/SV/SVAL.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV9a":
          return (await import("./cards/SV/SV9a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV9s":
          return (await import("./cards/SV/SV9s.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV9":
          return (await import("./cards/SV/SV9.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV8s":
          return (await import("./cards/SV/SV8s.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV8a":
          return (await import("./cards/SV/SV8a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV8":
          return (await import("./cards/SV/SV8.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV7a":
          return (await import("./cards/SV/SV7a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV7s":
          return (await import("./cards/SV/SV7s.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV7":
          return (await import("./cards/SV/SV7.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV6s":
          return (await import("./cards/SV/SV6s.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV6a":
          return (await import("./cards/SV/SV6a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV6":
          return (await import("./cards/SV/SV6.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV5s":
          return (await import("./cards/SV/SV5s.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV5a":
          return (await import("./cards/SV/SV5a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV5M":
          return (await import("./cards/SV/SV5M.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV5K":
          return (await import("./cards/SV/SV5K.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV4s":
          return (await import("./cards/SV/SV4s.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV4M":
          return (await import("./cards/SV/SV4M.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV4a":
          return (await import("./cards/SV/SV4a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV4K":
          return (await import("./cards/SV/SV4K.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV3a":
          return (await import("./cards/SV/SV3a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV3s":
          return (await import("./cards/SV/SV3s.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV3":
          return (await import("./cards/SV/SV3.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV2P":
          return (await import("./cards/SV/SV2P.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV2a":
          return (await import("./cards/SV/SV2a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV2D":
          return (await import("./cards/SV/SV2D.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV1a":
          return (await import("./cards/SV/SV1a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV1V":
          return (await import("./cards/SV/SV1V.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV1S":
          return (await import("./cards/SV/SV1S.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV11B":
          return (await import("./cards/SV/SV11B.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV11W":
          return (await import("./cards/SV/SV11W.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV10":
          return (await import("./cards/SV/SV10.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM9b":
          return (await import("./cards/SM/SM9b.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM9a":
          return (await import("./cards/SM/SM9a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SV-P":
          return (await import("./cards/SV/SV-P.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM9":
          return (await import("./cards/SM/SM9.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM8a":
          return (await import("./cards/SM/SM8a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM8":
          return (await import("./cards/SM/SM8.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM7b":
          return (await import("./cards/SM/SM7b.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM8b":
          return (await import("./cards/SM/SM8b.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM7a":
          return (await import("./cards/SM/SM7a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM7":
          return (await import("./cards/SM/SM7.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM6b":
          return (await import("./cards/SM/SM6b.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM6a":
          return (await import("./cards/SM/SM6a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM6":
          return (await import("./cards/SM/SM6.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM5p":
          return (await import("./cards/SM/SM5p.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM5S":
          return (await import("./cards/SM/SM5S.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM5M":
          return (await import("./cards/SM/SM5M.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM4S":
          return (await import("./cards/SM/SM4S.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM4A":
          return (await import("./cards/SM/SM4A.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM3p":
          return (await import("./cards/SM/SM3p.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM3N":
          return (await import("./cards/SM/SM3N.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM3H":
          return (await import("./cards/SM/SM3H.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM2p":
          return (await import("./cards/SM/SM2p.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM2L":
          return (await import("./cards/SM/SM2L.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM2K":
          return (await import("./cards/SM/SM2K.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM1p":
          return (await import("./cards/SM/SM1p.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM1S":
          return (await import("./cards/SM/SM1S.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM1M":
          return (await import("./cards/SM/SM1M.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM12":
          return (await import("./cards/SM/SM12.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM12a":
          return (await import("./cards/SM/SM12a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM11b":
          return (await import("./cards/SM/SM11b.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM11a":
          return (await import("./cards/SM/SM11a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM10b":
          return (await import("./cards/SM/SM10b.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM11":
          return (await import("./cards/SM/SM11.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM10a":
          return (await import("./cards/SM/SM10a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "CSMPiC":
          return (await import("./cards/SM/CSMPiC.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM10":
          return (await import("./cards/SM/SM10.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PMCG6":
          return (await import("./cards/PMCG/PMCG6.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PMCG5":
          return (await import("./cards/PMCG/PMCG5.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PMCG3":
          return (await import("./cards/PMCG/PMCG3.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PMCG4":
          return (await import("./cards/PMCG/PMCG4.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PMCG2":
          return (await import("./cards/PMCG/PMCG2.json", {
            with: { type: 'json' } 
          })).default;
      
        case "Miscellaneous Promos":
          return (await import("./cards/misc/Miscellaneous Promos.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PMCG1":
          return (await import("./cards/PMCG/PMCG1.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PCG9":
          return (await import("./cards/PCG/PCG9.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PCG8":
          return (await import("./cards/PCG/PCG8.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PCG7":
          return (await import("./cards/PCG/PCG7.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PCG6":
          return (await import("./cards/PCG/PCG6.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PCG5":
          return (await import("./cards/PCG/PCG5.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PCG4":
          return (await import("./cards/PCG/PCG4.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PCG3":
          return (await import("./cards/PCG/PCG3.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PCG2":
          return (await import("./cards/PCG/PCG2.json", {
            with: { type: 'json' } 
          })).default;
      
        case "PCG1":
          return (await import("./cards/PCG/PCG1.json", {
            with: { type: 'json' } 
          })).default;
      
        case "M6":
          return (await import("./cards/M/M6.json", {
            with: { type: 'json' } 
          })).default;
      
        case "M5":
          return (await import("./cards/M/M5.json", {
            with: { type: 'json' } 
          })).default;
      
        case "M4":
          return (await import("./cards/M/M4.json", {
            with: { type: 'json' } 
          })).default;
      
        case "M3":
          return (await import("./cards/M/M3.json", {
            with: { type: 'json' } 
          })).default;
      
        case "MC":
          return (await import("./cards/M/MC.json", {
            with: { type: 'json' } 
          })).default;
      
        case "M2a":
          return (await import("./cards/M/M2a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "M2":
          return (await import("./cards/M/M2.json", {
            with: { type: 'json' } 
          })).default;
      
        case "M1S":
          return (await import("./cards/M/M1S.json", {
            with: { type: 'json' } 
          })).default;
      
        case "M1L":
          return (await import("./cards/M/M1L.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SPZ":
          return (await import("./cards/S/SPZ.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SPD":
          return (await import("./cards/S/SPD.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SP6":
          return (await import("./cards/S/SP6.json", {
            with: { type: 'json' } 
          })).default;
      
        case "M-P":
          return (await import("./cards/M/M-P.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SP5":
          return (await import("./cards/S/SP5.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SN":
          return (await import("./cards/S/SN.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SLL":
          return (await import("./cards/S/SLL.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SLD":
          return (await import("./cards/S/SLD.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SK":
          return (await import("./cards/S/SK.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SJ":
          return (await import("./cards/S/SJ.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SH":
          return (await import("./cards/S/SH.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SDP":
          return (await import("./cards/S/SDP.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SDM":
          return (await import("./cards/S/SDM.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SDL":
          return (await import("./cards/S/SDL.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SCD":
          return (await import("./cards/S/SCD.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SI":
          return (await import("./cards/S/SI.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SCB":
          return (await import("./cards/S/SCB.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SCC":
          return (await import("./cards/S/SCC.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SCA":
          return (await import("./cards/S/SCA.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SC2b":
          return (await import("./cards/S/SC2b.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SC2a":
          return (await import("./cards/S/SC2a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SC2D":
          return (await import("./cards/S/SC2D.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SC1b":
          return (await import("./cards/S/SC1b.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SC1a":
          return (await import("./cards/S/SC1a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SC1D":
          return (await import("./cards/S/SC1D.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S9a":
          return (await import("./cards/S/S9a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "SM4p":
          return (await import("./cards/SM/SM4p.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S8a":
          return (await import("./cards/S/S8a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S7R":
          return (await import("./cards/S/S7R.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S8":
          return (await import("./cards/S/S8.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S8b":
          return (await import("./cards/S/S8b.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S7D":
          return (await import("./cards/S/S7D.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S6a":
          return (await import("./cards/S/S6a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S6K":
          return (await import("./cards/S/S6K.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S6H":
          return (await import("./cards/S/S6H.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S5a":
          return (await import("./cards/S/S5a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S5R":
          return (await import("./cards/S/S5R.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S5I":
          return (await import("./cards/S/S5I.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S4":
          return (await import("./cards/S/S4.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S4a":
          return (await import("./cards/S/S4a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S12":
          return (await import("./cards/S/S12.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S12a":
          return (await import("./cards/S/S12a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S11a":
          return (await import("./cards/S/S11a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S10b":
          return (await import("./cards/S/S10b.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S11":
          return (await import("./cards/S/S11.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S10a":
          return (await import("./cards/S/S10a.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S10P":
          return (await import("./cards/S/S10P.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S10D":
          return (await import("./cards/S/S10D.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S9":
          return (await import("./cards/S/S9.json", {
            with: { type: 'json' } 
          })).default;
      
        case "S-P":
          return (await import("./cards/S/S-P.json", {
            with: { type: 'json' } 
          })).default;
      
    }
    
    throw new Error(`Cannot load cards for unknown set "${setId}".`);
  };
  
  const loadCardById = async (id: string): Promise<any> => {
    const lastDashIndex = id.lastIndexOf('-');
    
    if (lastDashIndex <= 1) {
      return;
    }
    
    const setId = id.substring(0, lastDashIndex);
    const cards = await loadCardsBySetId(setId);
    return cards?.find((item: any) => item.id === id);
  };
  
  export const repository = { loadSeries, loadSeriesById, loadSetsBySeriesId, loadSetById, loadCardsBySetId, loadCardById };