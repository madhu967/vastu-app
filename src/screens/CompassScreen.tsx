import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { palette, typography } from '@/constants/theme';
import { useAppLanguage } from '@/context/AppLanguageContext';
import { getAppStrings } from '@/i18n/strings';
import { ScreenHeader } from '@/components/ScreenHeader';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const compassSize = width * 0.78;

export default function CompassScreen() {
  const { language } = useAppLanguage();
  const strings = getAppStrings(language);
  const [magnetometer, setMagnetometer] = useState(0);
  const [subscription, setSubscription] = useState<any>(null);
  const filterRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    Magnetometer.setUpdateInterval(16);
    setSubscription(
      Magnetometer.addListener(data => {
        if (filterRef.current.x === 0 && filterRef.current.y === 0) {
          filterRef.current.x = data.x;
          filterRef.current.y = data.y;
        } else {
          const alpha = 0.15;
          filterRef.current.x = filterRef.current.x + alpha * (data.x - filterRef.current.x);
          filterRef.current.y = filterRef.current.y + alpha * (data.y - filterRef.current.y);
        }
        setMagnetometer(_angle(filterRef.current));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const _angle = (magnetometer: any) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const _degree = (magnetometer: number) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  const degree = _degree(magnetometer);
  let direction = '';

  if (degree >= 337.5 || degree < 22.5) direction = 'N';
  else if (degree >= 22.5 && degree < 67.5) direction = 'NE';
  else if (degree >= 67.5 && degree < 112.5) direction = 'E';
  else if (degree >= 112.5 && degree < 157.5) direction = 'SE';
  else if (degree >= 157.5 && degree < 202.5) direction = 'S';
  else if (degree >= 202.5 && degree < 247.5) direction = 'SW';
  else if (degree >= 247.5 && degree < 292.5) direction = 'W';
  else if (degree >= 292.5 && degree < 337.5) direction = 'NW';

  // Render tick marks
  const renderTicks = () => {
    const ticks = [];
    for (let i = 0; i < 360; i += 5) {
      const isMajor = i % 30 === 0;
      ticks.push(
        <View
          key={i}
          style={[
            styles.tickWrapper,
            { transform: [{ rotate: `${i}deg` }] }
          ]}
        >
          <View style={[styles.tick, isMajor ? styles.majorTick : styles.minorTick]} />
          {isMajor && (
            <Text style={[styles.tickText, { transform: [{ rotate: `-${i}deg` }] }]}>
              {i}
            </Text>
          )}
        </View>
      );
    }
    return ticks;
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Vastu Compass" subtitle="Find your true direction" />
      
      <View style={styles.content}>
        
        {/* Main Compass Container */}
        <View style={styles.compassWrapper}>
          
          {/* Static Outer Ring (Decorative) */}
          <View style={styles.outerRing}>
            <View style={styles.innerRing}>
              
              {/* Static Top Pointer */}
              <View style={styles.pointerTriangle} />
              
              {/* Rotating Dial */}
              <Animated.View
                style={[
                  styles.compassDial,
                  { transform: [{ rotate: `${360 - degree}deg` }] }
                ]}
              >
                {renderTicks()}
                
                {/* Cardinal Directions */}
                <Text style={[styles.cardinal, styles.north]}>N</Text>
                <Text style={[styles.cardinal, styles.east]}>E</Text>
                <Text style={[styles.cardinal, styles.south]}>S</Text>
                <Text style={[styles.cardinal, styles.west]}>W</Text>
                
                {/* Center Core */}
                <View style={styles.compassCenter}>
                  <View style={styles.compassCenterDot} />
                </View>
                
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Text Readout */}
        <View style={styles.readoutContainer}>
          <Text style={styles.degreeText}>{Math.round(degree)}°</Text>
          <Text style={styles.directionText}>{direction}</Text>
        </View>
        <Text style={styles.readoutSubtext}>Align your device for accurate Vastu readings</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  compassWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  outerRing: {
    width: compassSize + 40,
    height: compassSize + 40,
    borderRadius: (compassSize + 40) / 2,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.gold,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: palette.borderLight,
  },
  innerRing: {
    width: compassSize,
    height: compassSize,
    borderRadius: compassSize / 2,
    backgroundColor: palette.surfaceWarm,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderWidth: 4,
    borderColor: palette.border,
    elevation: 4,
  },
  compassDial: {
    width: '100%',
    height: '100%',
    borderRadius: compassSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: palette.primary,
    position: 'absolute',
    top: -2, // overlapping the inner ring slightly
    zIndex: 20,
    ...Platform.select({
      ios: {
        shadowColor: palette.primaryDeep,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      }
    })
  },
  tickWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  tick: {
    width: 2,
    position: 'absolute',
    top: 10,
    borderRadius: 1,
  },
  minorTick: {
    height: 6,
    width: 1.5,
    backgroundColor: '#DCD0BB', // softer warm grey/gold
  },
  majorTick: {
    height: 12,
    width: 2.5,
    backgroundColor: palette.gold,
  },
  tickText: {
    position: 'absolute',
    top: 28,
    color: palette.secondaryText,
    fontSize: 11,
    fontFamily: typography.caption.fontFamily,
    fontWeight: '600',
  },
  cardinal: {
    position: 'absolute',
    fontSize: 34,
    fontFamily: typography.hero.fontFamily,
    fontWeight: '700',
    color: palette.text,
  },
  north: { top: 55, color: palette.primary }, // Deep crimson
  south: { bottom: 55 },
  east: { right: 55 },
  west: { left: 55 },
  compassCenter: {
    width: compassSize * 0.12,
    height: compassSize * 0.12,
    borderRadius: compassSize * 0.06,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: palette.border,
  },
  compassCenterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.gold,
  },
  readoutContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 12,
  },
  degreeText: {
    fontSize: 64,
    fontFamily: typography.hero.fontFamily,
    color: palette.primary,
    fontWeight: '700',
    lineHeight: 70,
  },
  directionText: {
    fontSize: 32,
    fontFamily: typography.hero.fontFamily,
    color: palette.gold,
    fontWeight: '700',
  },
  readoutSubtext: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: typography.body.fontFamily,
    color: palette.secondaryText,
    textAlign: 'center',
  },
});
